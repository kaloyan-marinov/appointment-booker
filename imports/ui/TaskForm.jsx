import React, { useState } from "react";
// import { TasksCollection } from "/imports/api/TasksCollection";

export const TaskForm = () => {
  const [date, setDate] = useState(""); // TODO: (2024/09/21, 21:36) - is there a `date`?
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!text) return;

  //   await Meteor.callAsync("tasks.insert", {
  //     text: text.trim(),
  //     createdAt: new Date(),
  //   });

  //   setText("");
  // };

  return (
    <form
      className="task-form"
      // onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="date"></label>

        <input
          type="text" // TODO: (2024/09/21, 21:36) - is there a `date`?
          placeholder="Type to add new tasks"
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

      <button type="submit">Create</button>
    </form>
  );
};
