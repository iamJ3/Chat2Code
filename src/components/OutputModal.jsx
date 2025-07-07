import React from 'react';

const OutputModal = ({
  showOutput,
  setShowOutput,
  iframeUrl,
  consoleOutput,
  activeTab,
  setActiveTab,
  setIframeUrl
}) => {
  if (!showOutput) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative w-[90vw] max-w-5xl h-[80vh] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg font-semibold transition duration-200"
          onClick={() => setShowOutput(false)}
        >
          ✕ Close
        </button>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          {iframeUrl && (
            <button
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === 'browser'
                  ? 'border-b-2 border-indigo-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('browser')}
            >
              🌐 Browser
            </button>
          )}
          {consoleOutput && (
            <button
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === 'console'
                  ? 'border-b-2 border-indigo-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('console')}
            >
              🖥️ Console
            </button>
          )}
          {!iframeUrl && !consoleOutput && (
            <span className="px-4 py-3 text-slate-400 text-sm">
              No output available
            </span>
          )}
        </div>

        {/* Output Content */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col gap-4">
          {iframeUrl && activeTab === 'browser' && (
            <div className="flex flex-col h-full">
              <input
                type="text"
                value={iframeUrl}
                onChange={e => setIframeUrl(e.target.value)}
                className="w-full mb-3 px-4 py-2 rounded-md border border-slate-600 bg-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter URL"
              />
              <div className="flex-1 overflow-hidden rounded-lg border border-slate-700">
                <iframe
                  src={iframeUrl}
                  title="App Output"
                  className="w-full h-full"
                  style={{ border: 'none', backgroundColor: '#1f2937', color: 'white' }}
                  sandbox="allow-scripts allow-forms allow-same-origin"
                />
              </div>
            </div>
          )}

          {consoleOutput && activeTab === 'console' && (
            <div className="w-full h-full bg-slate-900 p-4 rounded-xl border border-slate-700 overflow-auto">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-base font-semibold text-slate-200">Console Output</h3>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
                {consoleOutput}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputModal;
