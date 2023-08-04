const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  attendeeList: {
    type: Array,
    default: [],
  },
});

eventSchema.methods.toJSON = function () {
  const event = this.toObject();
  delete event.__v;

  return event;
};

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
