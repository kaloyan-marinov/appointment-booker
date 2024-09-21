import React, { useState, Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Appointment } from "./Appointment";
import { ManageAppointmentForm } from "./ManageAppointmentForm";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [appointmentForEditing, setAppointmentForEditing] = useState(null);
  // const isLoading = useSubscribe("tasks");

  // const hideCompletedFilter = {
  //   isChecked: {
  //     $ne: true,
  //   },
  // };

  // const pendingTasksCount = useTracker(()                                                                => {
  //   if (!user) {
  //     return 0;
  //   }

  //   return TasksCollection.find(hideCompletedFilter).count();
  // });

  // const tasks = useTracker(() => {
  //   if (!user) {
  //     return [];
  //   }

  //   return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
  //     sort: {
  //       createdAt: -1,
  //     },
  //   }).fetch();
  // });

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

  // if (isLoading()) {
  //   return <div>Loading...</div>;
  // }

  const appointments = [
    { _id: 1, fistName: "Alice", lastName: "Allison", date: new Date() },
    { _id: 2, firstName: "Bob", lastName: "Baker", date: new Date() },
    { _id: 3, firstName: "Charlie", lastName: "Chaplin", date: new Date() },
  ];

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
