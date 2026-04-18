import { createContext, useReducer } from "react";
import { taskReducer } from "../reducers/todosReducer.ts";
import type { Action } from "../reducers/todosReducer.ts";
import type { Task } from "../types/task.ts";

type TaskContextType = {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
