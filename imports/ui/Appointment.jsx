import React from "react";
import { convertDatetimeToString } from "../utilities";

export const Appointment = (props) => {
  const { appointment, setAppointmentForEditing } = props;

  return (
    <li>
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
