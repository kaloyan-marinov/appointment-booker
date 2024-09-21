import React from "react";

export const Task = ({ task, onCheckboxClick }) => {
  console.log(task.isChecked); // -> undefined
  console.log(typeof task.isChecked); // -> undefined

  console.log(!task.isChecked); // -> true
  console.log(typeof !task.isChecked); // -> boolean

  console.log(!!task.isChecked); // -> false
  console.log(typeof !!task.isChecked); // -> boolean

  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
    </li>
  );
};
