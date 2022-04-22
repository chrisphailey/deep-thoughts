const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThoughtById,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);

router.route("/user/:userId").post(addThought);
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(addReaction)
  .delete(deleteThought);

router.route("/:userId/:thoughtId").put(updateThoughtById);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
