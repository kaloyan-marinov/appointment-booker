import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { AppointmentsCollection } from "/imports/api/AppointmentsCollection";
import "../imports/api/AppointmentsPublications";
import "../imports/api/tasksMethods";

const RAW_APPOINTMENTS = [
  { firstName: "Donald", lastName: "Duck", date: new Date() },
  { firstName: "Daffy", lastName: "Duck", date: new Date() },
  { firstName: "Ellen", lastName: "Edwards", date: new Date() },
];

const insertAppointment = (rawAppointment, user) => {
  AppointmentsCollection.insertAsync({
    ...rawAppointment,
    userId: user._id,
  });
};

// TODO: (2024/09/21, 14:17)
//      avoid hardcoding the following values
const USER_1_USERNAME = "test1";
const USER_1_PASSWORD = "pass1";
const USER_2_USERNAME = "test2";
const USER_2_PASSWORD = "pass2";

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

  if ((await AppointmentsCollection.find().countAsync()) === 0) {
    RAW_APPOINTMENTS.forEach((rawAppointment) =>
      insertAppointment(rawAppointment, user1)
    );
  }
});
