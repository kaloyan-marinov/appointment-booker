import React from "react";
import { convertDatetimeToString } from "../utilities";

export const Appointment = (props) => {
  /*
  console.log(task.isChecked); // -> undefined
  console.log(typeof task.isChecked); // -> undefined

  console.log(!task.isChecked); // -> true
  console.log(typeof !task.isChecked); // -> boolean

  console.log(!!task.isChecked); // -> false
  console.log(typeof !!task.isChecked); // -> boolean
  */
  const { appointment, setAppointmentForEditing } = props;

  return (
    <li>
      {/* <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      /> */}
      <span>
        {convertDatetimeToString(appointment.datetime)} -{" "}
        {appointment.firstName} {appointment.lastName}
      </span>
      <button onClick={() => setAppointmentForEditing(appointment)}>
        Edit
      </button>
    </li>
  );
};
