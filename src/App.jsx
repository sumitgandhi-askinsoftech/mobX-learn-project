import { useEffect } from "react";
import "./App.css";

import { todoList } from "./store/TodoStore";
import { observer } from "mobx-react";
import { autorun, reaction } from "mobx";

const App = observer(() => {
  // console.log(import.meta.env);
  useEffect(() => {
    autorun(() => {
      localStorage.setItem("todos", JSON.stringify(todoList.todo));
      // if (todoList.todo.length > 0) {
      console.log("First item:", todoList.todo[0]);
      // }
    });
  }, []);
  // useEffect(() => {
  //   reaction(
  //     () => todoList.todo,
  //     (todo) => {
  //       localStorage.setItem("todos", JSON.stringify(todo));
  //       console.log("First item:", todo[0]);
  //     },
  //     {
  //       delay: 1000,
  //     }
  //   );
  // }, []);

  useEffect(() => {
    reaction(
      () => todoList.completedTaskCount,
      (completedTaskCount) => {
        console.log("Completed task count changed:", completedTaskCount);
        if (completedTaskCount === todoList.todo.length) {
          console.log("All tasks completed");
        }
      }
    );
  }, []);
  return (
    <div className="app">
      <div>
        <div className="flex gap-2">
          <input
            type="text"
            value={todoList.currentTodoText}
            onChange={(e) => todoList.setCurrentTodoText(e.target.value)}
            // onChange={(e) => (todoList.currentTodoText = e.target.value)}
            placeholder="Enter Task Name"
            className=" p-2 outline-1 rounded-md bg-gray-200 "
          />
          <button
            onClick={() => todoList.addTask()}
            className="px-4 py-1 bg-blue-600 text-white rounded-md cursor-pointer border-none outline-none"
          >
            Add task
          </button>
          <button
            onClick={() => todoList.resetTask()}
            className="px-4 py-1 bg-blue-600 text-white rounded-md cursor-pointer border-none outline-none"
          >
            Reset
          </button>

          <span>{todoList.completedTaskCount}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 max-w-3xl justify-evenly">
          {todoList?.todo?.map((task, idx) => (
            <div
              key={idx}
              className={` flex gap-1  rounded-md  border-2 ${
                task?.isCompleted
                  ? "completed bg-blue-700 text-white  border-transparent"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={task?.isCompleted}
                onChange={() => todoList.taskCompletedToggle(task?.id)}
                id={`completed-checkbox${idx}`}
                className="hidden"
              />
              <label
                htmlFor={`completed-checkbox${idx}`}
                className="p-2 cursor-pointer"
              >
                {task?.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
export default App;
