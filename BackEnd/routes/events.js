const express = require("express");
const router = new express.Router();
const Event = require("./../models/Event");

router.post("/event/create", async (req, res) => {
  try {
    if (
      !req.body ||
      (req.body && Object.keys(req.body).length !== 3) ||
      typeof req.body.title !== "string" ||
      typeof req.body.place !== "string" ||
      typeof req.body.date !== "string"
    )
      throw new Error("Wrong request");

    const newEvent = new Event(req.body);
    const result = await newEvent.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/event/attend/:id", async (req, res) => {
  try {
    if (
      !req.body ||
      (req.body && Object.keys(req.body).length !== 2) ||
      typeof req.body.name !== "string" ||
      typeof req.body.attend !== "boolean" ||
      !req.params.id ||
      typeof req.params.id !== "string"
    )
      throw new Error("Wrong request");
    const event = await Event.findById(req.params.id);
    if (req.body.attend === true) {
      if (
        event.attendeeList.length > 0 &&
        event.attendeeList.includes(req.body.name)
      ) {
        throw new Error("Wrong request");
      } else event.attendeeList.push(req.body.name);
    } else if (req.body.attend === false) {
      if (
        event.attendeeList.length > 0 &&
        event.attendeeList.includes(req.body.name)
      ) {
        event.attendeeList.splice(event.attendeeList.indexOf(req.body.name), 1);
      }
    }
    const result = await event.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/events", async (req, res) => {
  try {
    const result = await Event.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/event/delete/:id", async (req, res) => {
  try {
    if (!req.params.id || (req.params.id && typeof req.params.id !== "string"))
      throw new Error("Wrong request");
    console.log(req.params.id);
    const result = await Event.findByIdAndDelete(req.params.id);
    console.log(result);
    if (!result) {
      throw new Error("Wrong request");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
