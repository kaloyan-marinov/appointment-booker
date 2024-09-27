import React, { Fragment, useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Appointment } from "./Appointment";
import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";

export const ListOfAppointments = (props) => {
  const { setAppointmentForEditing, user } = props;

  const [searchFor, setSearchFor] = useState("");

  const appointments = useTracker(() => {
    if (!user) {
      return [];
    }

    const appts = AppointmentsCollection.find(
      {
        $or: [
          {
            firstName: {
              $regex: "^" + searchFor,
              $options: "i",
            },
          },
          {
            lastName: {
              $regex: "^" + searchFor,
              $options: "i",
            },
          },
        ],
      },
      {
        sort: {
          datetime: -1,
        },
      }
    ).fetch();

    return appts;
  });

  const isLoading = useSubscribe("appointments");

  if (isLoading()) {
    return <div>Loading...</div>;
  }

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
