const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        // sort in DESC order by the _id value.
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
            })
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
        },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, { $set: req.body,}, { runValidators: true,new: true,})
            .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
            })
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
        },

    // delete user
  // delete user (BONUS: and delete associated thoughts)
    deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
    })
    .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull:  {friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;