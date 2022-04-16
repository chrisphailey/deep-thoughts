const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThoughtById,
  deleteThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(addThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThought);

router.route("/:thoughtId/reactions");

module.exports = router;
