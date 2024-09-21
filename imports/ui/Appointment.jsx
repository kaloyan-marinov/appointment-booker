import React from "react";

export const Appointment = (props) => {
  /*
  console.log(task.isChecked); // -> undefined
  console.log(typeof task.isChecked); // -> undefined

  console.log(!task.isChecked); // -> true
  console.log(typeof !task.isChecked); // -> boolean

  console.log(!!task.isChecked); // -> false
  console.log(typeof !!task.isChecked); // -> boolean
  */
  const { appointment } = props;

  return (
    <li>
      {/* <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      /> */}
      <span>{appointment.text}</span>
      <button onClick={() => onDeleteClick(appointment)}>&times;</button>
    </li>
  );
};
