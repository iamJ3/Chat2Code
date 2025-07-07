import React from 'react';
import { User2Icon, X } from "lucide-react";

const AddCollaboratorModal = ({
  isModalOpen,
  setIsModalOpen,
  users,
  selectedUserId,
  handleUserSelect,
  addCollaborators
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 text-white flex items-center justify-center bg-black/70 z-50">
      <div className="relative bg-slate-800 p-8 rounded-2xl shadow-2xl w-[22rem] max-h-[80vh] flex flex-col border border-slate-700/60">
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

        <div
          className="flex flex-col gap-2 overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
          style={{ maxHeight: "40vh" }}
        >
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => handleUserSelect(u._id)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${selectedUserId.includes(u._id)
                ? "bg-indigo-600 shadow"
                : "bg-slate-800/80"
                } hover:bg-slate-700 border border-slate-700/40`}
            >
              <div className="flex items-center gap-3">
                <User2Icon size={20} className="text-indigo-300" />
                <span>{u.email}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow focus:ring-2 focus:ring-indigo-400 transition mt-auto"
          onClick={addCollaborators}
        >
          Add Members
        </button>
      </div>
    </div>
  );
};

export default AddCollaboratorModal; 