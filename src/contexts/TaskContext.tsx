import { createContext, useReducer, useEffect } from "react";
import { taskReducer } from "../reducers/todosReducer";
import type { Action } from "../reducers/todosReducer";
import type { Task } from "../types/task";

type TaskContextType = {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

const init = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], init);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
