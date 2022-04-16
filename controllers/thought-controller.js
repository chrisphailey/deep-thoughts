const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   get single thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   create thought
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "No User found with this id" });
        }
        res.json(ThoughtData);
      })
      .catch((err) => res.json(err));
  },
  updateThoughtById({ params, body }, res) {
    Thought.findOneAndUpdate(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "No User found with this id" });
        }
        res.json(ThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deletedData) => {
        if (!deletedData) {
          res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(deletedData);
      })
      .catch((err) => res.json(err));
  },
  // get all reactions
  getReactions({ params, body }, res) {
    Thought.findOneAndUpdate(body);
  },
};

module.exports = thoughtController;
