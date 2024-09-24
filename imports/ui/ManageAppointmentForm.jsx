import React, { useState, Fragment } from "react";

export const ManageAppointmentForm = (props) => {
  // The admissible values for the next state variable are
  // "Create", "Edit".
  const [managementAction, setManagementAction] = useState("Create");

  const [datetime, setDatetime] = useState("");
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

    // Format the datetime into 'YYYY-MM-DD' format
    // (The created string, obviously, does not include a timezone explicitly;
    // however, it "uses" the local time of the user's machine.)

    // Format datetime in local time as 'YYYY-MM-DD'
    const datetime = appointmentForEditing.datetime;

    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, "0");

    // Construct the value for the input field
    const formattedDatetimeLocal = `${year}-${month}-${day}`;
    setDatetime(formattedDatetimeLocal);

    setFirstName(appointmentForEditing.firstName);
    setLastName(appointmentForEditing.lastName);
  }

  const handleSubmitInCreateForm = async (e) => {
    e.preventDefault();

    if (!datetime || !firstName || !lastName) return;

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
          type="date"
          placeholder="Date for appointment"
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
