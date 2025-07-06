import React from 'react';
import { Plus, Send, User2Icon, Users, X } from "lucide-react";
import Markdown from 'markdown-to-jsx';

const ChatSection = ({
  isSidePanelOpen,
  setIsSidePanelOpen,
  setIsModalOpen,
  messageBox,
  selectedUserId,
  users,
  project,
  message,
  setMessage,
  messages,
  SendMsg,
  handleUserSelect,
  WriteWIthAI,
  user
}) => {
  return (
    <section className="flex flex-col h-full w-full md:max-w-[28rem] bg-slate-800/95 shadow-2xl rounded-r-3xl flex-shrink-0 border-r border-slate-700">
      {/* Header */}
      <header className="flex items-center justify-between p-5 border-b border-slate-700 bg-slate-900/90 rounded-tr-3xl">
        <button
          className="flex gap-2 items-center px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-all duration-150"
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
      <div className="flex flex-col flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 p-6 gap-2">
        <div
          ref={messageBox}
          className="message-box flex flex-col gap-3 max-w-full"
        >
          {messages.map((msg, id) => (
            <div
              key={id}
              className={`max-w-[75%] rounded-2xl shadow-lg p-4 mb-1 ${(msg.sender?.email ?? msg.sender) === user.email
                ? "ml-auto bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 text-white"
                : "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-slate-200"
                } border border-slate-700/60`}
            >
              <div className="flex items-center gap-2 mb-1">
                <small className={`text-xs font-semibold ${(msg.sender?.email ?? msg.sender) === user.email
                  ? "text-indigo-100"
                  : "text-indigo-400"
                  }`}>
                  {msg.sender?.email ?? msg.sender}
                </small>
              </div>
              <div className="text-sm">
                {[
                  "Ai",
                  "Sachi AI"
                ].includes(msg.sender?.email ?? msg.sender) ? (
                  WriteWIthAI(msg.message)
                ) : msg.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex w-full border-t border-slate-700 bg-slate-900/90 p-4 gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="flex-grow px-5 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-slate-900 transition-all duration-150 shadow"
        />
        <button
          onClick={SendMsg}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg focus:ring-2 focus:ring-indigo-400 transition-all duration-150"
        >
          <Send size={22} />
        </button>
      </div>

      {/* Side Panel */}
      <div
        className={`absolute top-0 left-0 h-full w-full bg-slate-900/98 z-30 shadow-2xl transform transition-transform duration-300 ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } rounded-tr-3xl`}
      >
        <header className="flex justify-between items-center px-7 py-5 bg-slate-800 border-b border-slate-700 rounded-tr-3xl">
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

        <div className="side-panel flex flex-col gap-2 p-5 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {users
            .filter((u) =>
              Array.isArray(project.users)
                ? project.users.some(
                  (projUser) =>
                    (projUser._id || projUser) === u._id
                )
                : false
            )
            .map((u) => (
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
      </div>
    </section>
  );
};

export default ChatSection; 