import React, { useState, Fragment } from "react";
// import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";

export const ManageAppointmentForm = (props) => {
  // The admissible values for the next state variable are
  // "Create", "Edit".
  const [managementAction, setManagementAction] = useState("Create");

  const [datetime, setDatetime] = useState(""); // TODO: (2024/09/21, 21:36) - is there a `datetime`?
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { appointmentForEditing, setAppointmentForEditing } = props;

  const resetFormFields = () => {
    setManagementAction("Create");
    setAppointmentForEditing(null);
    setDatetime("");
    setFirstName("");
    setLastName("");
  };

  if (
    appointmentForEditing &&
    datetime !== appointmentForEditing.datetime &&
    firstName !== appointmentForEditing.firstName &&
    lastName !== appointmentForEditing.lastName
  ) {
    setManagementAction("Edit");

    // Format the datetime into 'YYYY-MM-DDTHH:MM' format
    // (The created string, obviously, does not include a timezone explicitly;
    // however, it "uses" the local time of the user's machine.)
    /*
    const strInISOFormat = appointmentForEditing.datetime.toISOString();
    const strInISOFormatWithoutSeconds = strInISOFormat.slice(0, 16); // Remove the seconds and timezone
    setDatetime(strInISOFormat);
    */
    // Format datetime in local time as 'YYYY-MM-DDTHH:MM'
    const datetime = appointmentForEditing.datetime;

    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, "0");
    const hours = String(datetime.getHours()).padStart(2, "0");
    const minutes = String(datetime.getMinutes()).padStart(2, "0");

    // Construct the value for the input field
    const formattedDatetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    setDatetime(formattedDatetimeLocal);

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

  const handleSubmitInCreateForm = async (e) => {
    e.preventDefault();

    if (!datetime || !firstName || !lastName) return;

    /*
    TODO: (2024/09/23, 08:13)

          motivated by
          ```
          const datetimeString = '2024-09-25T10:50';

          // Convert the string to a Date object (interpreted as local timezone)
          const datetime = new Date(datetimeString);

          console.log(datetime.toString());   // Output the datetime with the local timezone attached
          console.log(datetime.toISOString()); // Output the datetime in ISO 8601 format (UTC)
          ```
          change the names of variables that hold _datetime strings_ to `datetimeString`
          and thus reserve `datetime` for variables that hold `Date` objects
    */
    await Meteor.callAsync("appointments.insert", {
      datetime: new Date(datetime),
      firstName,
      lastName,
    });

    resetFormFields();
  };

  const handleSubmitInEditForm = async (e) => {
    e.preventDefault();

    if (!datetime || !firstName || !lastName) return;

    await Meteor.callAsync("appointments.update", {
      _id: appointmentForEditing._id,
      updatedDoc: {
        datetime: new Date(datetime),
        firstName,
        lastName,
      },
    });

    resetFormFields();
  };

  return (
    <form
      className="manage-appointment-form"
      onSubmit={
        managementAction === "Create"
          ? handleSubmitInCreateForm
          : handleSubmitInEditForm
      }
    >
      <div>
        <span>{managementAction} appointment</span>
      </div>
      <div>
        <label htmlFor="datetime"></label>

        <input
          type="datetime-local"
          placeholder="Datetime for appointment"
          name="datetime"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
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

      <div className="management-actions">
        {managementAction === "Create" ? (
          <button type="submit">Create</button>
        ) : (
          <Fragment>
            <button type="submit">Save</button>
            <button type="button" onClick={() => resetFormFields()}>
              Cancel
            </button>
          </Fragment>
        )}
      </div>
    </form>
  );
};
