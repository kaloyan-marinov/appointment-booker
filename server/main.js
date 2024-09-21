import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/api/TasksCollection";
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";

const insertTask = (taskText) => {
  TasksCollection.insertAsync({
    text: taskText,
    createdAt: new Date(),
  });
};

// TODO: (2024/09/21, 14:17)
//      avoid hardcoding the following values
const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {
  // TODO: (2024/09/21, 14:18)
  //      look into why VS Code issues a warning for each of the next 2 uses of `await`,
  //      with said warning reading
  //      "'await' has no effect on the type of this expression.ts(80007)"
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

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
