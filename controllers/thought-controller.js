const { Thought, User } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
     // sort in DESC order by the _id value.
        .sort({createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
    })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
},

    // get single thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        // User.findOne({ _id: req.params.userId })
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'Thought with this ID does not exist.' });
        }
        res.json(dbThoughtData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },
    
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created!' });
            }

            res.json({ message: 'Thought successfully created!' });
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
    },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
        .then((dbThoughtData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No thought with this id!' });
                }  
                res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
    },

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }

          // remove thought id from user's `thoughts` field
            return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            return res.status(404).json({ message: 'Thought successfully deleted not associated with user!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // remove reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    };

module.exports = thoughtController;