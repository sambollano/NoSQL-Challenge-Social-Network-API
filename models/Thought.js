const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) =>
            moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    {
    toJSON: {
        getters: true,
    },
  }
),

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
       reactions: [ReactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;