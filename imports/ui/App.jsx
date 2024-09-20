import React from "react";
import { Task } from "./Task";

const tasks = [
  { _id: 1, text: "buy groceries" },
  { _id: 2, text: "cook dinner" },
  { _id: 3, text: "do the dishes" },
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <ul>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </ul>
  </div>
);
