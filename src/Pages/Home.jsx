import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/User.context";
import { Plus, User } from "lucide-react";
import axios from "../config/axios"
import {useNavigate} from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [projectName, setprojectName] = useState(null);
  const [project, setproject] = useState([])
const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Creating project with name:", projectName);


    axios.post("/projects/create", { name: projectName })
      .then((response) => {
        console.log("Project created successfully:", response.data);
        setisModelOpen(false);
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  }

  useEffect(() => {
    axios.get('/projects/all')
      .then((response) => {
        setproject(response.data.projects);
        console.log (response.data.projects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, [])

  return (
    <main className="p-6 space-y-6">
      <section className="projects flex items-center gap-6">
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          onClick={() => setisModelOpen(true)}
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>

        <div className="project-list flex gap-3">
          {project.map((project) => (
            <div
              key={project._id}
              onClick={()=> {
                  navigate(`/project`, {
                      state: {project}, 
                  })
                  console.log('Project clicked:', project)
              }}
              className="project-item border rounded-lg p-4 shadow-md flex items-center gap-4 transition-all duration-300
               hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
            >
              <div className="icon bg-blue-100 p-2 rounded-full transition-all duration-300 group-hover:bg-blue-200">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.name}
                </h3>
                <small className="text-xs text-gray-500 mt-1">
                  {project.users.length}{" "}
                  {project.users.length === 1 ? "Member" : "Members"}
                </small>
              </div>
            </div>
          ))}

        </div>
      </section>
      {/* Modal */}
      {
        isModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
              <form
                onSubmit={createProject}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="projectName">
                    Project Name
                  </label>
                  <input
                    onChange={(e) => setprojectName(e.target.value)}
                    value={projectName}
                    id="projectName"
                    name="projectName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => setisModelOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      <div></div>
    </main >
  );
};

export default Home;
