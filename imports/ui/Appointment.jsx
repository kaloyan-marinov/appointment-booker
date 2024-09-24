import React from "react";
import { convertDatetimeToDateOnlyString } from "../utilities";

export const Appointment = (props) => {
  const { appointment, setAppointmentForEditing } = props;

  return (
    <li>
      <span>
        {convertDatetimeToDateOnlyString(appointment.datetime)} -{" "}
        {appointment.firstName} {appointment.lastName}
      </span>
      <button onClick={() => setAppointmentForEditing(appointment)}>
        Edit
      </button>
    </li>
  );
};
