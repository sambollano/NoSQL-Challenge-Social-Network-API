const { User, Thought } = require("../models"); 

module.exports = {
    getAllUsers: (req, res) => {
        User.find({})
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found!' });
                    return;
                  }
                  res.json(data); 
            }) 
            .catch(err => res.json(err)); 
    },

    getOneUser: (req, res) => {
        User.find({
            _id: req.params.id
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found!' });
                    return;
                }
                res.json(data); 
            }) 
            .catch(err => res.json(err)); 
    },

    postOneUser: (req, res) => {
        User.create(req.body)
            .then(({_id}) => {
                return User.findOneAndUpdate (
                    {_id: req.body.userId},
                    {$push: {users: _id}},
                    {new: true}
                )
            })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found!' });
                    return;
                }
                res.json(data); 
            }) 
            .catch(err => res.json(err));
    },
    
    updateUser: (req, res) => {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    
    removeUser: (req, res) => {
        User.findOneAndDelete({ _id: params.id })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            User.findOneAndUpdate(
                { username: data.username },
                { $pull: { users: params.id } }
            )
            .then(() => {
                res.json({message: 'Successfully deleted the user'});
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.json(err));
    },
    
    addNewFriend: (req, res) => {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    
    removeFriend: (req, res) => {
        User.findOneAndDelete(
            { _id: params.userId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No friend found with this id' });
                return;
            }
            res.json({message: 'Successfully deleted friend'});
        })
        .catch(err => res.json(err));
    },
}