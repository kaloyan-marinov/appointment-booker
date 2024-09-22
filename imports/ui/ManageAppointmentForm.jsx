import React, { useState } from "react";
// import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";

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

      {/* TODO: (2024/09/21, 23:09)
                extract the creation of the buttons out of here
                and recall that they should be

                  Create

                  or

                  Save + Cancel
      */}
      <button type="submit">{managementAction}</button>
      {managementAction === "Edit" && (
        <button type="submit" onClick={() => setAppointmentForEditing(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};
