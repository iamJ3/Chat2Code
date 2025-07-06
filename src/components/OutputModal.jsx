import React from 'react';

const OutputModal = ({
  showOutput,
  setShowOutput,
  iframeUrl,
  consoleOutput,
  activeTab,
  setActiveTab
}) => {
  // Debug logging
  console.log('OutputModal props:', { showOutput, iframeUrl, consoleOutput, activeTab });
  
  if (!showOutput) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-[90vw] max-w-4xl h-[80vh] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col">
        <button
          className="absolute top-4 right-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded shadow font-semibold z-10"
          onClick={() => setShowOutput(false)}
        >
          Close Output
        </button>
        
        {/* Tabs for different output types */}
        <div className="flex border-b border-slate-700">
          {iframeUrl && (
            <button
              className={`px-4 py-2 text-slate-300 hover:text-white border-b-2 ${activeTab === 'browser' ? 'border-indigo-500' : 'border-transparent'}`}
              onClick={() => setActiveTab('browser')}
            >
              Browser
            </button>
          )}
          {consoleOutput && (
            <button
              className={`px-4 py-2 text-slate-300 hover:text-white border-b-2 ${activeTab === 'console' ? 'border-indigo-500' : 'border-transparent'}`}
              onClick={() => setActiveTab('console')}
            >
              Console
            </button>
          )}
          {!iframeUrl && !consoleOutput && (
            <span className="px-4 py-2 text-slate-400 text-sm">
              No output available
            </span>
          )}
        </div>
        
        {/* Output Content */}
        <div className="flex-1 p-4">
          {iframeUrl && activeTab === 'browser' && (
            <iframe
              src={iframeUrl}
              title="App Output"
              className="w-full h-full rounded-lg"
              style={{ border: 'none' }}
              sandbox="allow-scripts allow-forms allow-same-origin"
            />
          )}
          
          {consoleOutput && activeTab === 'console' && (
            <div className="w-full h-full bg-slate-800 p-4 rounded-lg overflow-auto">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-slate-300">Console Output</h3>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-slate-600 h-full overflow-auto">
                <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
                  {consoleOutput}
                </pre>
              </div>
            </div>
          )}
          
          {!iframeUrl && !consoleOutput && (
            <div className="w-full h-full bg-slate-800 p-4 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No Output Available</h3>
                <p className="text-slate-400 text-sm">
                  Run your code first to see output here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputModal; 