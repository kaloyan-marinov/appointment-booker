import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";

export const App = () => {
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() =>
    TasksCollection.find(
      {},
      {
        sort: {
          createdAt: -1,
        },
      }
    ).fetch()
  );

  const handleToggleChecked = ({ _id, isChecked }) => {
    Meteor.callAsync("tasks.toggleChecked", {
      _id,
      isChecked,
    });
  };

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <TaskForm />

      <ul>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onCheckboxClick={handleToggleChecked}
          />
        ))}
      </ul>
    </div>
  );
};
