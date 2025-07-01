import { useLocation } from "react-router-dom";
import { Plus, Send, User2Icon, Users, X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import axios from "../config/axios";
import { UserContext } from '../context/User.context.jsx';
import { initilizeSocket, reciveMessage, SendMessage } from "../config/socket";

const Projects = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);


  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setusers] = useState([])
  const [project, setproject] = useState(location.state.project);
  const [message, setmessage] = useState('')

  useEffect(() => {

    initilizeSocket(location.state.project._id)
    reciveMessage('project-message', data => {
      console.log("Received message:", data);
    });;

    axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      setproject(res.data.project);
      console.log(res.data.project);
    });

    axios.get('/users/all').then(res => {
      setusers(res.data.users)

    }).catch(err => {
      console.error(err);
    });
  }, []);

  const handleUserSelect = (userId) => {
    if (selectedUserId.includes(userId)) {
      setSelectedUserId(selectedUserId.filter((id) => id !== userId));
    } else {
      setSelectedUserId([...selectedUserId, userId]);
    }
    console.log(selectedUserId);
  };

  function addCollaborators() {
    axios.put("/projects/add-user", {
      projectId: location.state.project._id,
      users: Array.from(selectedUserId)
    }).then(res => {
      console.log(res.data);
      setIsModalOpen(false);
    }).catch(err => {
      console.error(err);
    });
  }
  function SendMsg() {
    SendMessage('project-message', {
      sender: users._Id,
      message
    });
    setmessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100">
      <main className="flex h-screen overflow-hidden">
        {/* Chat Section */}
        <section className="flex flex-col h-full min-w-[22rem] bg-slate-800/90 shadow-xl relative rounded-r-2xl">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/80">
            <button
              className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Add Members</span>
            </button>

            <Users
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="cursor-pointer hover:text-indigo-400 transition"
              size={28}
            />
          </header>

          {/* Messages */}
          <div className="flex flex-col flex-grow overflow-y-auto p-6">
            <div className="flex flex-col gap-5 max-w-full">
              {/* Incoming message */}
              <div className="max-w-[70%] bg-slate-700/80 rounded-2xl shadow p-4">
                <div className="flex items-center gap-2 mb-1">
                  <User2Icon size={18} className="text-indigo-300" />
                  <small className="text-indigo-300 font-medium">
                    jatin@gmail.com
                  </small>
                </div>
                <p className="text-slate-100">
                  Hello! This is a sample incoming message to check the UI.
                </p>
              </div>

              {/* Outgoing message */}
              <div className="ml-auto max-w-[70%] bg-indigo-700/90 rounded-2xl shadow p-4">
                <div className="flex items-center gap-2 mb-1">
                  <User2Icon size={18} className="text-indigo-200" />
                  <small className="text-indigo-200 font-medium">
                    you@gmail.com
                  </small>
                </div>
                <p className="text-white">
                  This is your outgoing message bubble with a proper username.
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="flex w-full border-t border-slate-700 bg-slate-900/80 p-4 gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              placeholder="Enter your message"
              className="flex-grow px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button onClick={SendMsg}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow transition">
              <Send size={22} />
            </button>
          </div>

          {/* Side Panel */}
          <div
            className={`absolute top-0 left-0 h-full w-full bg-slate-900/95 z-20 shadow-2xl transform transition-transform duration-300 ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <header className="flex justify-between items-center px-6 py-4 bg-slate-800 border-b border-slate-700 rounded-tr-2xl">
              <h1 className="font-semibold text-xl text-indigo-300">
                Collaborators
              </h1>
              <button
                onClick={() => setIsSidePanelOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-full transition"
              >
                <X size={22} />
              </button>
            </header>

            <div className=" side-panel flex flex-col gap-2 p-4 overflow-y-auto max-h-full">
              {users.filter(user =>
                Array.isArray(project.users)
                  ? project.users.some(u => (u._id || u) === user._id)
                  : false
              ).map(user => (
                <div
                  key={user._id}
                  onClick={() => handleUserSelect(user._id)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${selectedUserId.includes(user._id)
                    ? "bg-indigo-600"
                    : "bg-slate-800/80"
                    } hover:bg-slate-700`}
                >
                  <div className="flex items-center gap-3">
                    <User2Icon size={20} className="text-indigo-300" />
                    <span>{user.email}</span>
                  </div>
                  {/* {selectedUserId.includes(user._id) && (
                    <span className="text-green-400 font-semibold">
                      Selected
                    </span> 
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="relative bg-slate-800 p-6 rounded-xl shadow-lg w-[22rem] max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-indigo-300">
                  Add Collaborator
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable user list */}
              <div
                className="flex flex-col gap-2 overflow-y-auto mb-4 pr-1"
                style={{ maxHeight: "40vh" }}
              >
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user._id)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${selectedUserId.includes(user._id)
                      ? "bg-indigo-600"
                      : "bg-slate-800/80"
                      } hover:bg-slate-700`}
                  >
                    <div className="flex items-center gap-3">
                      <User2Icon size={20} className="text-indigo-300" />
                      <span>{user.email}</span>
                    </div>
                    {selectedUserId.includes(user.id) && (
                      <span className="text-green-400 font-semibold">
                        Selected
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Members button pinned at bottom */}
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition mt-auto"
                onClick={addCollaborators}
              >
                Add Members
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
