import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";
import "../imports/api/AppointmentsPublications";
import "../imports/api/appointmentsMethods";
import { randomInt } from "../imports/utilities";

// Read from environment variables.
const USER_1_USERNAME = process.env.USER_1_USERNAME;
const USER_1_PASSWORD = process.env.USER_1_PASSWORD;
const USER_2_USERNAME = process.env.USER_2_USERNAME;
const USER_2_PASSWORD = process.env.USER_2_PASSWORD;

// Each of the following names starts with a vowel.
const ARRAY_1_FIRST_NAMES = [
  "Adam",
  "Alexander",
  "Alice",
  "Ed",
  "Eddie",
  "Edward",
  "Ellen",
  "Ian",
  "Isiah",
  "Owen",
];

const ARRAY_1_LAST_NAMES = [
  "Abbott",
  "Allen",
  "Anderson",
  "Edwards",
  "Ellis",
  "Evans",
  "Irwin",
  "Olson",
  "Ortiz",
  "Underwood",
];

// Each of the following names starts with a consonant.
const ARRAY_2_FIRST_NAMES = [
  "Brian",
  "Chris",
  "Daniel",
  "David",
  "James",
  "Kevin",
  "Laura",
  "Michael",
  "Rebecca",
  "Stephen",
];

const ARRAY_2_LAST_NAMES = [
  "Brown",
  "Clark",
  "Davis",
  "Garcia",
  "Harris",
  "Johnson",
  "Martinez",
  "Robinson",
  "Smith",
  "Wilson",
];

// Helper function.
const insertAppointment = (rawAppointment, user) => {
  AppointmentsCollection.insertAsync({
    ...rawAppointment,
    userId: user._id,
  });
};

// Arrange for
// (a) 2 users to be created, and
// (b) 20 appointments for each user to be created.
Meteor.startup(async () => {
  // TODO: (2024/09/21, 14:18)
  //      look into why VS Code issues a warning for each of the next uses of `await`,
  //      with said warning reading
  //      "'await' has no effect on the type of this expression.ts(80007)"
  for (const [username, password] of [
    [USER_1_USERNAME, USER_1_PASSWORD],
    [USER_2_USERNAME, USER_2_PASSWORD],
  ]) {
    if (!(await Accounts.findUserByUsername(username))) {
      await Accounts.createUser({
        username,
        password,
      });
    }
  }

  const user1 = await Accounts.findUserByUsername(USER_1_USERNAME);
  const user2 = await Accounts.findUserByUsername(USER_2_USERNAME);

  if ((await AppointmentsCollection.find().countAsync()) === 0) {
    for (let i = 0; i < 20; i++) {
      const daysInFuture = randomInt(0, 30);
      const datetime = new Date();
      datetime.setDate(datetime.getDate() + daysInFuture);

      const idxFirstName = randomInt(0, ARRAY_1_FIRST_NAMES.length - 1);
      const idxLastName = randomInt(0, ARRAY_1_LAST_NAMES.length - 1);

      const rawAppointment = {
        firstName: ARRAY_1_FIRST_NAMES[idxFirstName],
        lastName: ARRAY_1_LAST_NAMES[idxLastName],
        datetime,
      };
      insertAppointment(rawAppointment, user1);
    }

    for (let j = 0; j < 20; j++) {
      const daysInFuture = randomInt(0, 30);
      const datetime = new Date();
      datetime.setDate(datetime.getDate() + daysInFuture);

      const idxFirstName = randomInt(0, ARRAY_2_FIRST_NAMES.length - 1);
      const idxLastName = randomInt(0, ARRAY_2_LAST_NAMES.length - 1);

      const rawAppointment = {
        firstName: ARRAY_2_FIRST_NAMES[idxFirstName],
        lastName: ARRAY_2_LAST_NAMES[idxLastName],
        datetime,
      };
      insertAppointment(rawAppointment, user2);
    }
  }
});
