import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";

import "../imports/api/TasksPublications";

const insertTask = (taskText) => {
  TasksCollection.insertAsync({
    text: taskText,
  });
};

Meteor.startup(async () => {
  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      "Task 1",
      "Task 2",
      "Task 3",
      "Task 4",
      "Task 5",
      "Task 6",
      "Task 7",
    ].forEach(insertTask);
  }
});
