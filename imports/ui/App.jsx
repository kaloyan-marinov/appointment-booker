import React from "react";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";

const tasks = [
  { _id: 1, text: "buy groceries" },
  { _id: 2, text: "cook dinner" },
  { _id: 3, text: "do the dishes" },
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
  </div>
);
