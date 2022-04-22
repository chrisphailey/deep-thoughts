const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    console.log("working");
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   get single thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
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
          res.status(404).json({ message: "No thought found with this id" });
        }
        res.json(ThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedData) => {
        if (!deletedData) {
          res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(deletedData);
      })
      .catch((err) => res.json(err));
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((addedReaction) => {
        if (!addedReaction) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(addedReaction);
      })
      .catch((err) => res.json(err));
  },
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((deletedReaction) => {
        if (!deletedReaction) {
          res.status(404).json({ message: "No reaction exists with this id" });
        }
        res.json(deletedReaction);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
