import React, { Fragment } from "react";
import { Appointment } from "./Appointment";

export const ListOfAppointments = (props) => {
  const { searchFor, setSearchFor, appointments, setAppointmentForEditing } =
    props;

  return (
    <Fragment>
      <div className="input-for-search">
        <input
          type="text"
          placeholder="Type to filter by first or last name"
          name="search"
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
        />
      </div>
      <ul className="appointments">
        {appointments.map((appointment) => (
          <Appointment
            key={appointment._id}
            appointment={appointment}
            setAppointmentForEditing={setAppointmentForEditing}
          />
        ))}
      </ul>
    </Fragment>
  );
};
