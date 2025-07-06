import React from 'react';
import { X } from "lucide-react";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import json from 'highlight.js/lib/languages/json';

// Register highlight.js languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c', cpp); // C uses the same highlighter as C++
hljs.registerLanguage('json', json);

const CodeEditor = ({
  currentfile,
  setcurrentfile,
  openfiles,
  setopenfiles,
  filetree,
  setfiletree,
  runCode,
  webcontainer,
  isRunning,
  iframeUrl,
  consoleOutput,
  setShowOutput
}) => {
  // Helper to get language from file extension
  function getLanguageFromFileName(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return 'javascript';
      case 'java':
        return 'java';
      case 'py':
      case 'python':
        return 'python';
      case 'c':
        return 'c';
      case 'cpp':
      case 'cc':
      case 'cxx':
        return 'cpp';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  }

  // Helper to check language support in WebContainer
  function getLanguageSupport(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return 'supported'; // Full support
      case 'json':
        return 'supported'; // Full support
      case 'py':
      case 'python':
        return 'unsupported'; // Not available in WebContainer
      case 'java':
        return 'unsupported'; // Not available in WebContainer
      case 'c':
      case 'cpp':
      case 'cc':
      case 'cxx':
        return 'unsupported'; // Not available in WebContainer
      default:
        return 'limited'; // Unknown file type
    }
  }

  return (
    <div className="code-editor flex-grow h-full bg-slate-900 text-slate-100 flex flex-col min-w-0 max-w-full">
      {/* File Tabs Bar */}
      <div className="w-full flex items-center border-b border-slate-700 bg-slate-800 px-2 min-w-0">
        {/* Tabs (scrollable) */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <div className="flex gap-1 min-w-0 items-center">
            {openfiles.map((file, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={() => setcurrentfile(file)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition ${currentfile === file
                    ? "bg-slate-900 text-slate-100 border-b-2 border-indigo-500 shadow"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                    }`}
                  style={{ maxWidth: '200px', minWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  <span className="truncate max-w-[8rem]">{file}</span>
                  <span
                    onClick={e => {
                      e.stopPropagation();
                      setopenfiles(openfiles.filter((_, i) => i !== index));
                      if (currentfile === file) {
                        setcurrentfile(openfiles[index - 1] || openfiles[index + 1] || null);
                      }
                    }}
                    className="ml-2 p-1 hover:bg-slate-600 rounded cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label="Close file tab"
                  >
                    <X size={14} />
                  </span>
                  {/* Place Run Install button right after the current file tab */}
                  {currentfile === file && (
                    <div className="flex items-center gap-2 ml-3">
                      <button
                        onClick={() => runCode(file)}
                        className={`px-3 py-1 rounded shadow font-semibold text-white text-xs transition ${!webcontainer || Object.keys(filetree).length === 0 || isRunning
                          ? 'bg-gray-500 cursor-not-allowed'
                          : getLanguageSupport(file) === 'supported'
                            ? 'bg-green-600 hover:bg-green-700'
                            : getLanguageSupport(file) === 'limited'
                              ? 'bg-yellow-600 hover:bg-yellow-700'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        disabled={!webcontainer || Object.keys(filetree).length === 0 || isRunning}
                      >
                        {!webcontainer
                          ? 'Loading...'
                          : Object.keys(filetree).length === 0
                            ? 'No Files'
                            : isRunning
                              ? 'Running...'
                              : 'Run'}
                      </button>
                      {getLanguageSupport(file) !== 'supported' && (
                        <span className="text-xs text-slate-400" title="Limited support in WebContainer">
                          ⚠️
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      {/* File Content */}
      <div className="flex-1 p-6 overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 w-full max-w-full min-w-0">
        {filetree[currentfile] && (
          <div className="w-full max-w-full min-w-0">
            <h2 className="text-lg font-semibold text-slate-100 mb-4 truncate flex items-center gap-2">
              {currentfile}
            </h2>
            <div className="relative w-full max-w-full min-w-0 overflow-x-auto">
              <div
                className="w-full min-h-[400px] p-4 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg font-mono text-base leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-x-auto whitespace-pre"
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                style={{ maxWidth: '100%', boxSizing: 'border-box', minHeight: '400px', outline: 'none', whiteSpace: 'pre', overflowWrap: 'normal' }}
                onInput={e => {
                  const text = e.currentTarget.innerText;
                  setfiletree({ ...filetree, [currentfile]: { content: text } });
                }}
                onBlur={e => {
                  const text = e.currentTarget.innerText;
                  setfiletree({ ...filetree, [currentfile]: { content: text } });
                }}
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    try {
                      const lang = getLanguageFromFileName(currentfile);
                      return hljs.highlight(filetree[currentfile].content, { language: lang }).value;
                    } catch {
                      return filetree[currentfile].content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    }
                  })()
                }}
              />
            </div>
            {/* Show Output Button */}
            {(iframeUrl || consoleOutput) && (
              <button
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow font-semibold transition"
                onClick={() => setShowOutput(true)}
              >
                Show Output
              </button>
            )}
            
            {/* Console Output (inline) */}
            {consoleOutput && (
              <div className="mt-4 p-4 bg-slate-800 border border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Console Output
                  </h3>
                  <button
                    onClick={() => setShowOutput(true)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Open in Modal
                  </button>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-600 max-h-48 overflow-y-auto">
                  <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
                    {consoleOutput}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor; 