const { Thought, User } = require("../models"); 

module.exports = {
    getAllThoughts: (req, res) => {
        Thought.find({})
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found!' });
                    return;
                  }
                  res.json(data); 
            }) 
            .catch(err => res.json(err)); 
    },

    getOneThought: (req, res) => {
        Thought.find({
            _id: req.params.id
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found!' });
                    return;
                }
                res.json(data); 
            }) 
            .catch(err => res.json(err)); 
    },

    postOneThought: (req, res) => {
        Thought.create(req.body)
            .then(({_id}) => {
                return User.findOneAndUpdate (
                    {_id: req.body.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found!' });
                    return;
                }
                res.json(data); 
            }) 
            .catch(err => res.json(err));
    },
    
    updateThought: (req, res) => {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    
    removeThought: (req, res) => {
        Thought.findOneAndDelete({ _id: params.id })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            User.findOneAndUpdate(
                { username: data.username },
                { $pull: { thoughts: params.id } }
            )
            .then(() => {
                res.json({message: 'Successfully deleted the thought'});
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.json(err));
    },
    
    createReaction: (req, res) => {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    
    removeReaction: (req, res) => {
        Thought.findOneAndDelete(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No reaction found with this id' });
                return;
            }
            res.json({message: 'Successfully deleted the reaction'});
        })
        .catch(err => res.json(err));
    },
}