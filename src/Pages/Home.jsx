import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/User.context";
import { useToast } from "../context/Toast.context";
import { Plus, User } from "lucide-react";
import axios from "../config/axios"
import {useNavigate} from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const { showError, showSuccess } = useToast();
  const [isModelOpen, setisModelOpen] = useState(false);
  const [projectName, setprojectName] = useState(null);
  const [project, setproject] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/projects/create", { name: projectName });
      
      if (response.data.success) {
        console.log("Project created successfully:", response.data);
        showSuccess(response.data.message || 'Project created successfully!');
        setisModelOpen(false);
        setprojectName('');
        // Refresh projects list
        fetchProjects();
      } else {
        showError(response.data.message || 'Failed to create project');
      }
    } catch (error) {
      console.error("Error creating project:", error);
      if (error.response?.status === 503) {
        showError('Database connection failed. Please try again later.');
      } else {
        showError(error.response?.data?.message || 'Failed to create project');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('/projects/all');
      if (response.data.success) {
        setproject(response.data.projects);
        console.log(response.data.projects);
      } else {
        showError(response.data.message || 'Failed to load projects');
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      if (error.response?.status === 503) {
        showError('Database connection failed. Please try again later.');
      } else {
        showError('Failed to load projects. Please refresh the page.');
      }
    }
  }, [showError]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, <span className="text-purple-400">{user?.name || 'User'}</span>
        </h1>
        <p className="text-gray-300 text-lg">Manage your projects and collaborate with your team</p>
      </div>

      {/* Projects Section */}
      <section className="space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Your Projects</h2>
          <button
            className="group flex items-center gap-3 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            onClick={() => setisModelOpen(true)}
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            New Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {project.map((project) => (
            <div
              key={project._id}
              onClick={() => {
                navigate(`/project`, {
                  state: { project },
                });
                console.log('Project clicked:', project);
              }}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-800/70 cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:to-purple-600/10 rounded-2xl transition-all duration-300"></div>
              
              <div className="relative z-10">
                {/* Project Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-6 h-6 text-white" />
                </div>
                
                {/* Project Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <small className="text-sm text-gray-400">
                      {project.users.length}{" "}
                      {project.users.length === 1 ? "Member" : "Members"}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {project.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">Create your first project to get started</p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
              onClick={() => setisModelOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Create Project
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setisModelOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Create New Project</h2>
              </div>
              
              <form onSubmit={createProject} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="projectName">
                    Project Name
                  </label>
                  <input
                    onChange={(e) => setprojectName(e.target.value)}
                    value={projectName || ''}
                    id="projectName"
                    name="projectName"
                    type="text"
                    required
                    placeholder="Enter project name..."
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-all duration-300"
                    onClick={() => setisModelOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-3 text-sm font-medium text-white rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      isLoading 
                        ? 'bg-purple-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                    }`}
                  >
                    {isLoading ? 'Creating...' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
