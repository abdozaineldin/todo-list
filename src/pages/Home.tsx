import { useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { motion } from "framer-motion";

import { TaskContext } from "../contexts/TaskContext";

type Props = {
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Home: React.FC<Props> = ({ setEmail, darkMode, toggleDarkMode }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [updatedTask, setUpdatedTask] = useState({ title: "", desc: "" });
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taskDelete, setTaskDelete] = useState<string | null>(null);

  const [filter, setFilter] = useState<"all" | "done" | "not">("all");

  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;

  const { tasks, dispatch } = taskContext;

  function handleLogout() {
    localStorage.removeItem("email");
    setEmail(null);
  }

  function handleAddDialgoClose() {
    setOpenAddDialog(false);
    setTitle("");
    setDesc("");
  }

  function handleEditDialgoClose() {
    setOpenEditDialog(false);
    setEditingTask(null);
    setUpdatedTask({ title: "", desc: "" });
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "not") return !task.done;
    return true;
  });

  return (
    <div
      className={`flex min-h-screen items-center justify-center font-sans transition-all duration-300 ${
        darkMode ? "bg-[#1A1A2E]" : "bg-gray-50"
      }`}
    >
      <div className="w-[90%] max-w-150 mt-20 mb-20">
        <h1 className="text-[40px] text-center mb-12 font-bold bg-linear-to-r from-[#3f00c8] to-[#d010fb] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]">
          To Do List
        </h1>
        <div className="flex mb-4 px-2 justify-between">
          <div
            className={`relative flex items-center transition-all p-1 rounded-lg w-fit ${darkMode ? "bg-[#161625]" : "bg-gray-100"}`}
          >
            <motion.div
              className={`absolute top-1 bottom-1 border rounded-md z-0 shadow-[0_0_8px_rgba(167,139,250,0.3)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] ${darkMode ? "border-[#7f56da] bg-[#645e6729]" : "border-[#7f56da] bg-white"}`}
              initial={false}
              animate={{
                x: filter === "all" ? 0 : filter === "done" ? 64 : 124,
                width: filter === "all" ? 60 : filter === "done" ? 56 : 84,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />

            <button
              onClick={() => setFilter("all")}
              className={`relative z-10 w-15 py-1 text-sm font-medium transition-all cursor-pointer hover:text-[#7f56da]  ${filter === "all" ? "text-[#7f56da]" : "text-gray-500"}`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("done")}
              className={`relative z-10 w-15 py-1 text-sm font-medium transition-all cursor-pointer hover:text-[#7f56da]  ${filter === "done" ? "text-[#7f56da]" : "text-gray-500"}`}
            >
              Done
            </button>

            <button
              onClick={() => setFilter("not")}
              className={`relative z-10 w-22 py-1 text-sm font-medium transition-all cursor-pointer hover:text-[#7f56da]  ${filter === "not" ? "text-[#7f56da]" : "text-gray-500"}`}
            >
              Not done
            </button>
          </div>
          <button onClick={toggleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <LightModeIcon
                className=""
                sx={{
                  color: "#7f56da",
                  transition: "all",
                  filter: "drop-shadow(0 0 10px rgba(167, 139, 250, 0.9))",
                }}
              />
            ) : (
              <DarkModeOutlinedIcon
                sx={{
                  color: "#7f56da",
                  transition: "all",
                  filter: "drop-shadow(0 0 10px rgba(167, 139, 250, 0.9))",
                }}
              />
            )}
          </button>
        </div>

        {/* Add Dialog */}
        <Dialog
          open={openAddDialog}
          onClose={handleAddDialgoClose}
          fullWidth
          maxWidth="sm"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({
                type: "ADD",
                payload: { title, desc },
              });
              handleAddDialgoClose();
            }}
            className={darkMode ? "bg-[#161625]" : "bg-white"}
          >
            <DialogTitle sx={{ color: "#7f56da", fontWeight: "bold" }}>
              Add New Task
            </DialogTitle>

            <DialogContent sx={{ backgroundColor: "transparent" }}>
              <input
                className={`w-full p-2 ${darkMode ? "g-[#161625] text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"} border-[1.5px] focus:border-[#A78BFA] outline-none rounded mb-3 mt-2`}
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className={`w-full p-2 ${darkMode ? "g-[#161625] text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"} border-[1.5px] focus:border-[#A78BFA] outline-none rounded`}
                placeholder="Task description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </DialogContent>

            <DialogActions
              sx={{ backgroundColor: darkMode ? "#161625" : "white", p: 2 }}
            >
              <Button sx={{ color: "#A78BFA" }} onClick={handleAddDialgoClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#7f56da",
                  "&:hover": { backgroundColor: "#6d3dd4" },
                }}
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/*=== Add Dialog ====*/}

        {/* Edit Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={handleEditDialgoClose}
          fullWidth
          maxWidth="sm"
        >
          <form
            className={darkMode ? "bg-[#161625]" : "bg-white"}
            onSubmit={(e) => e.preventDefault()}
          >
            <DialogTitle className="text-[#7f56da]">Edit Task</DialogTitle>

            <DialogContent sx={{ backgroundColor: "transparent" }}>
              <input
                className={`w-full p-2 border-[1.5px] rounded mb-3 mt-2 outline-none transition-all ${
                  darkMode
                    ? "bg-[#161625] text-white border-gray-700 focus:border-[#6d3dd4]"
                    : "bg-white text-gray-900 border-gray-300 focus:border-[#6d3dd4]"
                }`}
                placeholder="Task title"
                value={updatedTask.title}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, title: e.target.value })
                }
              />

              <input
                className={`w-full p-2 border-[1.5px] rounded outline-none transition-all ${
                  darkMode
                    ? "bg-[#161625] text-white border-gray-700 focus:border-[#6d3dd4]"
                    : "bg-white text-gray-900 border-gray-300 focus:border-[#6d3dd4]"
                }`}
                placeholder="Task description"
                value={updatedTask.desc}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, desc: e.target.value })
                }
              />
            </DialogContent>

            <DialogActions>
              <Button sx={{ color: "#7f56da" }} onClick={handleEditDialgoClose}>
                Cancel
              </Button>

              <Button
                sx={{ color: "#7f56da" }}
                onClick={() => {
                  if (editingTask) {
                    dispatch({
                      type: "EDIT",
                      payload: {
                        id: editingTask,
                        title: updatedTask.title,
                        desc: updatedTask.desc,
                      },
                    });
                  }
                  handleEditDialgoClose();
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/*=== Edit Dialog ===*/}

        {/* Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <form
            className={darkMode ? "bg-[#161625]" : "bg-white"}
            onSubmit={(e) => e.preventDefault()}
          >
            <DialogTitle className="text-[#7f56da]">Delete Task</DialogTitle>

            <DialogContent sx={{ color: darkMode ? "white" : "black" }}>
              Are you sure you want to delete this task?
            </DialogContent>

            <DialogActions>
              <Button
                sx={{ color: "#7f56da" }}
                onClick={() => setOpenDeleteDialog(false)}
              >
                Cancel
              </Button>

              <Button
                sx={{ color: "#7f56da" }}
                onClick={() => {
                  if (taskDelete) {
                    dispatch({ type: "DELETE", payload: taskDelete });
                  }
                  setOpenDeleteDialog(false);
                  setTaskDelete(null);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/*=== Delete Dialog ===*/}

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex justify-between items-center p-4 rounded-2xl border-[1.5px] border-[#7f56da] transition-all shadow-[0_0_8px_rgba(167,139,250,0.3)] hover:shadow-[0_0_12px_rgba(167,139,250,0.5)] ${darkMode ? "bg-[#161625]" : "bg-gray-100"}`}
            >
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div
                  onClick={() => dispatch({ type: "TOGGLE", payload: task.id })}
                  className={`w-7 h-7 shrink-0 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all
                    ${task.done ? "border-[#7f56da] bg-[#7f56da]" : "border-gray-300 hover:border-[#7f56da]"}`}
                >
                  <div
                    className={`w-2.5 h-2.5 bg-white rounded-full transition-transform ${task.done ? "scale-100" : "scale-0"}`}
                  />
                </div>
                {/*=== Radio Button ===*/}

                {/* Task Details */}
                <div className="flex flex-col">
                  <span
                    className={`text-lg font-medium transition-all ${
                      task.done
                        ? "text-gray-400 line-through"
                        : darkMode
                          ? "text-gray-200 "
                          : "text-gray-700"
                    }`}
                  >
                    {task.title}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-gray-400 font-medium">
                      {task.desc}
                    </span>
                  </div>
                </div>
                {/*=== Task Details ===*/}
              </div>

              <div className="flex gap-4 pr-2">
                {/* Edit Button */}
                <button
                  onClick={() => {
                    setEditingTask(task.id);
                    setUpdatedTask({
                      title: task.title,
                      desc: task.desc,
                    });
                    setOpenEditDialog(true);
                  }}
                  className="text-blue-500 hover:text-blue-400 transition-all cursor-pointer filter drop-shadow-[0_0_5px_rgba(59,130,246,0.9)] hover:drop-shadow-[0_0_10px_rgba(59,130,246,1)]"
                >
                  <EditIcon sx={{ fontSize: 24 }} />
                </button>
                {/*=== Edit Button ===*/}

                {/* Delete Button */}
                <button
                  onClick={() => {
                    setTaskDelete(task.id);
                    setOpenDeleteDialog(true);
                  }}
                  className="text-red-500 hover:text-red-400 transition-all cursor-pointer filter drop-shadow-[0_0_5px_rgba(239,68,68,0.9)] hover:drop-shadow-[0_0_10px_rgba(239,68,68,1)]"
                >
                  <DeleteIcon sx={{ fontSize: 24 }} />
                </button>
                {/*=== Delete Button ===*/}
              </div>
            </div>
          ))}

          {/* Add Task Button */}
          <motion.button
            animate={{
              scale: [1, 1.04, 1, 1.04, 1],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.2 },
            }}
            onClick={() => setOpenAddDialog(true)}
            className={`w-full border-[#7f56da] text-[#7f56da] mt-4 py-3 flex items-center
                      cursor-pointer  justify-center gap-2 border-[1.5px] border-gry-200 border-dashed
                      rounded-xl txt-gray-400 transition-colors shadow-[0_0_8px_rgba(167,139,250,0.2)] hover:shadow-[0_0_12px_rgba(167,139,250,0.4)] ${darkMode ? "bg-[#161625]" : "bg-white hover:bg-gray-50"}`}
          >
            <AddIcon sx={{ fontSize: 20 }} />
            <span className="font-medium ">Add a task</span>
          </motion.button>
          {/*=== Add Task Button ===*/}
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="cursor-pointer mt-6 text-red-500 hover:text-red-400 filter drop-shadow-[0_0_5px_rgba(239,68,68,0.9)] hover:drop-shadow-[0_0_10px_rgba(239,68,68,1)] transition"
        >
          <LogoutIcon
            sx={{
              fontSize: 25,
              transform: "scale(-1)",
              stroke: "currentColor",
              strokeWidth: 0.6,
            }}
          />
        </button>
        {/*=== Logout Button ===*/}
      </div>
    </div>
  );
};

export default Home;
