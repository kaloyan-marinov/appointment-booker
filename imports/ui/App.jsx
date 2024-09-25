import React, { useState, Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";
import { ListOfAppointments } from "./ListOfAppointments";
import { ManageAppointmentForm } from "./ManageAppointmentForm";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [searchFor, setSearchFor] = useState("");
  const [appointmentForEditing, setAppointmentForEditing] = useState(null);
  const isLoading = useSubscribe("appointments");

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

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Appointment Booker</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username}
            </div>

            <ManageAppointmentForm
              appointmentForEditing={appointmentForEditing}
              setAppointmentForEditing={setAppointmentForEditing}
            />

            <ListOfAppointments
              searchFor={searchFor}
              setSearchFor={setSearchFor}
              appointments={appointments}
              setAppointmentForEditing={setAppointmentForEditing}
            />
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
