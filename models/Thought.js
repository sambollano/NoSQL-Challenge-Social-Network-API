const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
       thoughtText: {
           type: String,
           required: true,
           min: 1,
           max: 280
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: date => new Intl.DateTimeFormat('en-US').format(date)
       },
       username: {
           type: String,
           required: true
       },
       reactions: [ReactionSchema]
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;