import React, { useState } from "react";
// import { TasksCollection } from "/imports/api/TasksCollection";

export const ManageAppointmentForm = (props) => {
  // The admissible values for the next state variable are
  // "Create", "Edit".
  const [managementAction, setManagementAction] = useState("Create");

  const [date, setDate] = useState(""); // TODO: (2024/09/21, 21:36) - is there a `date`?
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { appointmentForEditing, setAppointmentForEditing } = props;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!text) return;

  //   await Meteor.callAsync("tasks.insert", {
  //     text: text.trim(),
  //     createdAt: new Date(),
  //   });

  //   setText("");
  // };

  if (
    appointmentForEditing &&
    date !== appointmentForEditing.date &&
    firstName !== appointmentForEditing.firstName &&
    lastName !== appointmentForEditing.lastName
  ) {
    setManagementAction("Edit");

    setDate(appointmentForEditing.date);
    setFirstName(appointmentForEditing.firstName);
    setLastName(appointmentForEditing.lastName);
    // return (
    //   <form className="manage-appointment-form">
    //     <div>
    //       <span>_EDIT_ appointment ID: {appointmentForEditing._id}</span>
    //     </div>
    //     <button onClick={() => setAppointmentForEditing(null)}>Cancel</button>
    //   </form>
    // );
  }

  return (
    <form
      className="manage-appointment-form"
      // onSubmit={handleSubmit}
    >
      <div>
        <span>{`${managementAction}`} appointment</span>
      </div>
      <div>
        <label htmlFor="date"></label>

        <input
          type="text" // TODO: (2024/09/21, 21:36) - is there a `date`?
          placeholder="Date for appointment"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="firstName"></label>

        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lastName"></label>

        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <button type="submit">{managementAction}</button>
    </form>
  );
};
