import React from "react";
import issues from "../data/issues.json";
import { User, Calendar, Tag, Globe } from "lucide-react";

const IssuesDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center px-6 py-10">
      {/* Top-right New Issue button */}
      <button className="absolute top-0 right-0 m-5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-600 px-5 py-2 rounded-lg shadow-md transition text-white font-medium">
        + New Issue
      </button>

      {/* Header */}
      <header className="relative w-full max-w-5xl mb-10">
        <h1 className="text-center text-4xl font-bold flex items-center justify-center gap-2 text-white">
          <Globe className="w-10 h-10 text-blue-400" />
          Traveler Support Hub
        </h1>
        <p className="text-gray-300 text-center mt-5">
          Track and manage all reported issues from our visitors
        </p>
      </header>

      {/* Issues list */}
      <div className="w-full max-w-5xl space-y-6 text-white">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl shadow-lg hover:from-gray-700 hover:to-gray-600 hover:shadow-xl transition"
          >
            {/* Issue Details */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{issue.title}</h2>
                <span className="flex items-center gap-1 text-xs bg-green-600/30 px-2 py-1 rounded-full text-green-300">
                  <Tag className="w-3 h-3" />
                  {issue.priority}
                </span>
              </div>

              <p className="text-sm text-gray-300">{issue.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>📍 {issue.location}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <User className="w-4 h-4 text-orange-400" />
                <span>{issue.user}</span>
                <Calendar className="w-4 h-4 text-green-400 ml-4" />
                <span>{issue.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesDashboard;
