import React, { useState } from "react";

export const TaskForm = () => {
  const [text, setText] = useState("");

  return (
    <form className="task-form">
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};
