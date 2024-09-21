import React from "react";
import { convertDateToString } from "../utilities";

export const Appointment = (props) => {
  /*
  console.log(task.isChecked); // -> undefined
  console.log(typeof task.isChecked); // -> undefined

  console.log(!task.isChecked); // -> true
  console.log(typeof !task.isChecked); // -> boolean

  console.log(!!task.isChecked); // -> false
  console.log(typeof !!task.isChecked); // -> boolean
  */
  const { appointment, setApptIdForEditing } = props;

  return (
    <li>
      {/* <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      /> */}
      <span>
        {convertDateToString(appointment.date)} - {appointment.firstName}{" "}
        {appointment.lastName}
      </span>
      <button onClick={() => setApptIdForEditing(appointment._id)}>Edit</button>
    </li>
  );
};
