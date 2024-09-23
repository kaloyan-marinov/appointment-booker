import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";
import "../imports/api/AppointmentsPublications";
import "../imports/api/appointmentsMethods";

const ARRAY_1_RAW_APPOINTMENTS = [
  { firstName: "Alice", lastName: "Allison", datetime: new Date() },
  { firstName: "Bob", lastName: "Baker", datetime: new Date() },
  { firstName: "Charlie", lastName: "Chaplin", datetime: new Date() },
];

const ARRAY_2_RAW_APPOINTMENTS = [
  { firstName: "Donald", lastName: "Duck", datetime: new Date() },
  { firstName: "Daffy", lastName: "Duck", datetime: new Date() },
  { firstName: "Ellen", lastName: "Edwards", datetime: new Date() },
];

const insertAppointment = (rawAppointment, user) => {
  AppointmentsCollection.insertAsync({
    ...rawAppointment,
    userId: user._id,
  });
};

const USER_1_USERNAME = process.env.USER_1_USERNAME;
const USER_1_PASSWORD = process.env.USER_1_PASSWORD;
const USER_2_USERNAME = process.env.USER_2_USERNAME;
const USER_2_PASSWORD = process.env.USER_2_PASSWORD;

Meteor.startup(async () => {
  // TODO: (2024/09/21, 14:18)
  //      look into why VS Code issues a warning for each of the next 3 uses of `await`,
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
    ARRAY_1_RAW_APPOINTMENTS.forEach((rawAppointment) =>
      insertAppointment(rawAppointment, user1)
    );

    ARRAY_2_RAW_APPOINTMENTS.forEach((rawAppointment) =>
      insertAppointment(rawAppointment, user2)
    );
  }
});
