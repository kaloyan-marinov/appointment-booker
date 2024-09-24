import React, { useState, Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";
import { Appointment } from "./Appointment";
import { ManageAppointmentForm } from "./ManageAppointmentForm";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [searchFor, setSearchFor] = useState("");
  const [appointmentForEditing, setAppointmentForEditing] = useState(null);
  const isLoading = useSubscribe("appointments");

  // const hideCompletedFilter = {
  //   isChecked: {
  //     $ne: true,
  //   },
  // };

  // const pendingTasksCount = useTracker(()                                                                => {
  //   if (!user) {
  //     return 0;
  //   }

  //   return AppointmentsCollection.find(hideCompletedFilter).count();
  // });

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
          date: -1,
        },
      }
    ).fetch();

    return appts;
  });

  // const pendingTasksTitle = `${
  //   pendingTasksCount ? ` (${pendingTasksCount})` : ""
  // }`;
  // console.log("pendingTasksTitle", pendingTasksTitle);

  // const handleToggleChecked = ({ _id, isChecked }) => {
  //   Meteor.callAsync("tasks.toggleChecked", {
  //     _id,
  //     isChecked,
  //   });
  // };

  // const handleDelete = ({ _id }) => {
  //   Meteor.callAsync("tasks.delete", { _id });
  // };

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            {/* <h1>Appointment Booker {pendingTasksTitle}</h1> */}
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

            {/* <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div> */}

            <input
              type="text"
              placeholder="Type to filter by first or last name"
              name="search"
              value={searchFor}
              onChange={(e) => setSearchFor(e.target.value)}
            />
            <ul className="appointments">
              {appointments.map((appointment) => (
                <Appointment
                  key={appointment._id}
                  appointment={appointment}
                  // onCheckboxClick={handleToggleChecked}
                  setAppointmentForEditing={setAppointmentForEditing}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
