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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !firstName || !lastName) return;

    /*
    TODO: (2024/09/23, 08:13)

          motivated by
          ```
          const dateString = '2024-09-25T10:50';

          // Convert the string to a Date object (interpreted as local timezone)
          const date = new Date(dateString);

          console.log(date.toString());   // Output the date with the local timezone attached
          console.log(date.toISOString()); // Output the date in ISO 8601 format (UTC)
          ```
          change the names of variables that hold _date strings_ to `dateString`
          and thus reserve `date` for variables that hold `Date` objects
    */
    await Meteor.callAsync("appointments.insert", {
      date: new Date(date),
      firstName,
      lastName,
    });

    setDate("");
    setFirstName("");
    setLastName("");
  };

  if (
    appointmentForEditing &&
    date !== appointmentForEditing.date &&
    firstName !== appointmentForEditing.firstName &&
    lastName !== appointmentForEditing.lastName
  ) {
    setManagementAction("Edit");

    // Format the date into 'YYYY-MM-DDTHH:MM' format
    // (The created string, obviously, does not include a timezone explicitly;
    // however, it "uses" the local time of the user's machine.)
    /*
    const strInISOFormat = appointmentForEditing.date.toISOString();
    const strInISOFormatWithoutSeconds = strInISOFormat.slice(0, 16); // Remove the seconds and timezone
    setDate(strInISOFormat);
    */
    // Format date in local time as 'YYYY-MM-DDTHH:MM'
    const date = appointmentForEditing.date;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Construct the value for the input field
    const formattedDateTimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    setDate(formattedDateTimeLocal);

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
    <form className="manage-appointment-form" onSubmit={handleSubmit}>
      <div>
        <span>{`${managementAction}`} appointment</span>
      </div>
      <div>
        <label htmlFor="date"></label>

        <input
          type="datetime-local" // TODO: (2024/09/21, 21:36) - is there a `date`?
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
