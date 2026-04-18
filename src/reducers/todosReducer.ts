import type { Task } from "../types/task.ts";
import { v4 as uuidv4 } from "uuid";

export type Action =
  | { type: "ADD"; payload: { title: string; desc: string } }
  | { type: "DELETE"; payload: string }
  | { type: "TOGGLE"; payload: string }
  | { type: "EDIT"; payload: { id: string; title: string; desc: string } };

export function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD":
      if (!action.payload.title.trim()) return state;

      return [
        ...state,
        {
          id: uuidv4(),
          title: action.payload.title,
          desc: action.payload.desc,
          done: false,
        },
      ];

    case "DELETE":
      return state.filter((task) => task.id !== action.payload);

    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task,
      );

    case "EDIT":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
              desc: action.payload.desc,
            }
          : task,
      );

    default:
      return state;
  }
}
