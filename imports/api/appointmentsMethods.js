import { Meteor } from "meteor/meteor";
import { AppointmentsCollection } from "./AppointmentsCollection";

Meteor.methods({
  "appointments.insert"(doc) {
    return AppointmentsCollection.insertAsync({
      ...doc,
      userId: this.userId,
    });
  },
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
