import React from 'react';

const FileExplorer = ({
  filetree,
  setcurrentfile,
  openfiles,
  setopenfiles
}) => {
  return (
    <div className="explorer bg-slate-800 border-r border-slate-700 min-w-[13rem] max-w-[17rem] w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
      <div className="filetree w-full p-5 space-y-2">
        {Object.keys(filetree).map((file, index) => (
          <button
            key={index}
            onClick={() => {
              setcurrentfile(file)
              if (!openfiles.includes(file)) {
                setopenfiles([...openfiles, file])
              }
            }}
            className="tree-element flex items-center px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600 transition border border-slate-700/30"
          >
            <p className="font-medium text-slate-100 truncate max-w-[10rem]">{file}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer; 