const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    postOneThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(postOneThought);

router
    .route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought);

router.route('/:thoughtId/reactions/')
    .post(createReaction)
    .delete(removeReaction)

module.exports = router;