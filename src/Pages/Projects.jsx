import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "../config/axios";
import { UserContext } from "../context/User.context.jsx";
import 'highlight.js/styles/github-dark.css';
import { getWebContainer } from "../config/WebContainer";
import {
  initilizeSocket,
  reciveMessage,
  SendMessage,
} from "../config/socket";

// Import components
import ChatSection from "../components/ChatSection";
import FileExplorer from "../components/FileExplorer";
import CodeEditor from "../components/CodeEditor";
import OutputModal from "../components/OutputModal";
import AddCollaboratorModal from "../components/AddCollaboratorModal";

// Import utilities
import { toWebContainerFileTree, cleanAnsiCodes, getRunCommand } from "../utils/codeUtils";
import { WriteWIthAI, SyntaxHighlightedCode } from "../utils/aiMessageUtils.jsx";

const Projects = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messageBox = useRef(null);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentfile, setcurrentfile] = useState(null)
  const [filetree, setfiletree] = useState({});
  const [openfiles, setopenfiles] = useState([])
  const [webcontainer, setWebcontainer] = useState(null)
  const [runProcess, setRunProcess] = useState(null);
  const [iframeUrl, setIframeUrl] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('browser');

  useEffect(() => {
    console.log("🔧 Projects component mounted, checking WebContainer...");

    if (!webcontainer) {
      console.log("🔄 WebContainer not initialized, starting initialization...");
      getWebContainer().then((container) => {
        setWebcontainer(container)
        console.log("🎉 WebContainer initialized in component:", container)
      }).catch((error) => {
        console.error("💥 Failed to initialize WebContainer:", error);
        alert("Failed to initialize WebContainer. Please check your connection.");
      });
    } else {
      console.log("✅ WebContainer already initialized:", webcontainer);
    }

    webcontainer?.mount(message.filetree)
    initilizeSocket(project._id);

    reciveMessage("project-message", (data) => {
      console.log("Received message:", data)
      let message;
      // Check if data.message is already an object or needs to be parsed
      if (typeof data.message === 'string') {
        // Only try to parse if it looks like JSON (starts with { or [)
        if (data.message.trim().startsWith('{') || data.message.trim().startsWith('[')) {
          try {
            message = JSON.parse(data.message);
          } catch (error) {
            console.error('Failed to parse message:', error);
            message = data.message; // Use as is if parsing fails
          }
        } else {
          // It's a regular string message, not JSON
          message = data.message;
        }
      }

      else {
        message = data.message; // Already an object
      }

      if (message && message.fileTree) {
        // Transform the fileTree structure to match frontend expectations
        const transformedFileTree = {};
        Object.keys(message.fileTree).forEach(fileName => {
          const fileData = message.fileTree[fileName];
          if (fileData.file && fileData.file.contents) {
            transformedFileTree[fileName] = {
              content: fileData.file.contents
            };
          }
        });
        // Merge with existing files instead of replacing
        setfiletree(prevFileTree => ({
          ...prevFileTree,
          ...transformedFileTree
        }));

        // Also add the files to openfiles if they're not already there
        Object.keys(transformedFileTree).forEach(fileName => {
          setopenfiles(prevOpenFiles => {
            if (!prevOpenFiles.includes(fileName)) {
              return [...prevOpenFiles, fileName];
            }
            return prevOpenFiles;
          });
        });
      }
      setMessages((prev) => [...prev, data]);
    });

    axios.get(`/projects/get-project/${project._id}`).then((res) => {
      setProject(res.data.project);
    });

    axios.get("/users/all").then((res) => {
      setUsers(res.data.users);
    });
  }, []);


  useEffect(() => {
    scrollToBottom();


  }, [message])

  const handleUserSelect = (userId) => {
    if (selectedUserId.includes(userId)) {
      setSelectedUserId(selectedUserId.filter((id) => id !== userId));
    } else {
      setSelectedUserId([...selectedUserId, userId]);
    }
  };

  const addCollaborators = () => {
    axios
      .put("/projects/add-user", {
        projectId: project._id,
        users: Array.from(selectedUserId),
      })
      .then(() => setIsModalOpen(false));
  };

  const SendMsg = () => {
    if (!message.trim()) return;

    const msgObj = {
      sender: user.email,
      message,
    };

    SendMessage("project-message", msgObj);
    setMessages((prev) => [...prev, msgObj]);
    setMessage("");
  };

  const scrollToBottom = () => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  };



  // Function to run code
  const runCode = async (fileName) => {
    if (!webcontainer || !filetree[fileName]) return;

    setIsRunning(true);
    setConsoleOutput("");
    setIframeUrl("");

    try {
      await webcontainer.mount(toWebContainerFileTree(filetree));

      // Kill previous run process if exists
      if (runProcess) {
        await runProcess.kill();
      }

      const runConfig = getRunCommand(fileName);
      
      if (!runConfig) {
        setConsoleOutput("❌ Cannot run this file type. Supported: .js, .py, .java, .cpp, .c");
        setIsRunning(false);
        return;
      }

      // For Node.js projects with package.json, use npm start
      if (filetree['package.json'] && (fileName.endsWith('.js') || fileName.endsWith('.jsx'))) {
        setConsoleOutput("📦 Installing dependencies...\n");
        
        // Install dependencies first
        const installProcess = await webcontainer.spawn("npm", ["install"]);
        installProcess.output.pipeTo(new WritableStream({
          write(chunk) {
            const cleanChunk = cleanAnsiCodes(chunk);
            // Only show important install messages, filter out verbose npm output
            if (!cleanChunk.includes('npm notice') && !cleanChunk.includes('npm timing')) {
              setConsoleOutput(prev => prev + cleanChunk);
            }
          }
        }));
        
        await installProcess.exit;
        setConsoleOutput(prev => prev + "\n✅ Dependencies installed successfully!\n\n🚀 Starting application...\n");

        // Start the server
        let tempRunProcess = await webcontainer.spawn("npm", ["start"]);
        tempRunProcess.output.pipeTo(new WritableStream({
          write(chunk) {
            const cleanChunk = cleanAnsiCodes(chunk);
            // Filter out npm start wrapper messages and show only actual output
            if (!cleanChunk.includes('> ') && !cleanChunk.includes('npm start')) {
              setConsoleOutput(prev => prev + cleanChunk);
            }
          }
        }));

        setRunProcess(tempRunProcess);

        // Listen for server-ready event
        webcontainer.on('server-ready', (port, url) => {
          console.log(port, url);
          setIframeUrl(url);
          setConsoleOutput(prev => prev + `\n🌐 Server running on port ${port}\n📱 Open in browser: ${url}\n`);
        });
      } else {
        // For all other languages, run the file directly with language-specific commands
        let tempRunProcess;
        
        if (fileName.endsWith('.py') || fileName.endsWith('.python')) {
          setConsoleOutput(`🐍 Running ${fileName}...\n`);
          try {
            tempRunProcess = await webcontainer.spawn("python", [fileName]);
          } catch {
            setConsoleOutput(`❌ Python not available in this environment.\n\n💡 Alternatives:\n• Convert to JavaScript (.js)\n• Use online Python interpreters like repl.it\n• Install Python locally for development\n\n🔧 WebContainer currently supports: Node.js, npm, and basic shell commands.`);
            setIsRunning(false);
            return;
          }
        } else if (fileName.endsWith('.java')) {
          setConsoleOutput(`☕ Running ${fileName}...\n`);
          try {
            // For Java, compile first then run
            const compileProcess = await webcontainer.spawn("javac", [fileName]);
            compileProcess.output.pipeTo(new WritableStream({
              write(chunk) {
                setConsoleOutput(prev => prev + cleanAnsiCodes(chunk));
              }
            }));
            await compileProcess.exit;
            
            const className = fileName.replace('.java', '');
            tempRunProcess = await webcontainer.spawn("java", [className]);
          } catch {
            setConsoleOutput(`❌ Java not available in this environment.\n\n💡 Alternatives:\n• Convert to JavaScript (.js)\n• Use online Java compilers like replit.com\n• Install Java locally for development\n\n🔧 WebContainer currently supports: Node.js, npm, and basic shell commands.`);
            setIsRunning(false);
            return;
          }
        } else if (fileName.endsWith('.cpp') || fileName.endsWith('.cc') || fileName.endsWith('.cxx')) {
          setConsoleOutput(`⚡ Running ${fileName}...\n`);
          try {
            // For C++, compile then run
            const outputName = fileName.replace(/\.(cpp|cc|cxx)$/, '');
            const compileProcess = await webcontainer.spawn("g++", [fileName, "-o", outputName]);
            compileProcess.output.pipeTo(new WritableStream({
              write(chunk) {
                setConsoleOutput(prev => prev + cleanAnsiCodes(chunk));
              }
            }));
            await compileProcess.exit;
            
            tempRunProcess = await webcontainer.spawn("./" + outputName);
          } catch {
            setConsoleOutput(`❌ C++ not available in this environment.\n\n💡 Alternatives:\n• Convert to JavaScript (.js)\n• Use online C++ compilers like replit.com\n• Install g++ locally for development\n\n🔧 WebContainer currently supports: Node.js, npm, and basic shell commands.`);
            setIsRunning(false);
            return;
          }
        } else if (fileName.endsWith('.c')) {
          setConsoleOutput(`⚡ Running ${fileName}...\n`);
          try {
            // For C, compile then run
            const outputName = fileName.replace('.c', '');
            const compileProcess = await webcontainer.spawn("gcc", [fileName, "-o", outputName]);
            compileProcess.output.pipeTo(new WritableStream({
              write(chunk) {
                setConsoleOutput(prev => prev + cleanAnsiCodes(chunk));
              }
            }));
            await compileProcess.exit;
            
            tempRunProcess = await webcontainer.spawn("./" + outputName);
          } catch {
            setConsoleOutput(`❌ C not available in this environment.\n\n💡 Alternatives:\n• Convert to JavaScript (.js)\n• Use online C compilers like replit.com\n• Install gcc locally for development\n\n🔧 WebContainer currently supports: Node.js, npm, and basic shell commands.`);
            setIsRunning(false);
            return;
          }
        } else {
          // For JavaScript files without package.json, run directly with node
          setConsoleOutput(`🚀 Running ${fileName}...\n`);
          tempRunProcess = await webcontainer.spawn("node", [fileName]);
        }
        
        tempRunProcess.output.pipeTo(new WritableStream({
          write(chunk) {
            setConsoleOutput(prev => prev + cleanAnsiCodes(chunk));
          }
        }));

        setRunProcess(tempRunProcess);
      }

      // Show output after a short delay
      setTimeout(() => {
        setIsRunning(false);
      }, 1000);

    } catch (error) {
      setConsoleOutput(`❌ Error: ${error.message}`);
      setIsRunning(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 font-inter">
      <main className="flex h-screen overflow-hidden">
        {/* Chat Section */}
        <ChatSection
          isSidePanelOpen={isSidePanelOpen}
          setIsSidePanelOpen={setIsSidePanelOpen}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          messageBox={messageBox}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          users={users}
          project={project}
          message={message}
          setMessage={setMessage}
          messages={messages}
          SendMsg={SendMsg}
          handleUserSelect={handleUserSelect}
          addCollaborators={addCollaborators}
          WriteWIthAI={WriteWIthAI}
          SyntaxHighlightedCode={SyntaxHighlightedCode}
          user={user}
        />

        {/* File Tree Section */}
        <section className="flex flex-grow h-full">
          {/* Explorer Sidebar */}
          <FileExplorer
            filetree={filetree}
            setcurrentfile={setcurrentfile}
            openfiles={openfiles}
            setopenfiles={setopenfiles}
          />

          {/* Code Editor */}
          <CodeEditor
            currentfile={currentfile}
            setcurrentfile={setcurrentfile}
            openfiles={openfiles}
            setopenfiles={setopenfiles}
            filetree={filetree}
            setfiletree={setfiletree}
            runCode={runCode}
            webcontainer={webcontainer}
            isRunning={isRunning}
            iframeUrl={iframeUrl}
            consoleOutput={consoleOutput}
            setShowOutput={setShowOutput}
          />
        </section>

        {/* Output Browser Modal - moved outside section for proper z-index */}
        <OutputModal
          showOutput={showOutput}
          setShowOutput={setShowOutput}
          iframeUrl={iframeUrl}
          setIframeUrl={setIframeUrl}
          consoleOutput={consoleOutput}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Add Collaborator Modal */}
        <AddCollaboratorModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          users={users}
          selectedUserId={selectedUserId}
          handleUserSelect={handleUserSelect}
          addCollaborators={addCollaborators}
        />
      </main>
    </div>
  );
};

export default Projects;
