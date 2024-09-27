import React, { useState, Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
// import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";
import { ListOfAppointments } from "./ListOfAppointments";
import { ManageAppointmentForm } from "./ManageAppointmentForm";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [appointmentForEditing, setAppointmentForEditing] = useState(null);

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

      {user && (
        <ManageAppointmentForm
          appointmentForEditing={appointmentForEditing}
          setAppointmentForEditing={setAppointmentForEditing}
        />
      )}

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username}
            </div>

            <ListOfAppointments
              setAppointmentForEditing={setAppointmentForEditing}
              user={user}
            />
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
