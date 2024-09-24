import { Meteor } from "meteor/meteor";
import { AppointmentsCollection } from "./AppointmentsCollection";

Meteor.methods({
  "appointments.insert"(doc) {
    return AppointmentsCollection.insertAsync({
      ...doc,
      userId: this.userId,
    });
  },
  // "tasks.toggleChecked"({ _id, isChecked }) {
  //   return AppointmentsCollection.updateAsync(_id, {
  //     $set: {
  //       isChecked: !isChecked,
  //     },
  //   });
  // },
  // "tasks.delete"({ _id }) {
  //   return AppointmentsCollection.removeAsync(_id);
  // },
  "appointments.update"({ _id, updatedDoc }) {
    console.log("_id", _id);
    console.log("updatedDoc", updatedDoc);

    return AppointmentsCollection.updateAsync(_id, {
      $set: {
        ...updatedDoc,
      },
    });
  },
});
