const {Schema, model} = ('mongoose');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        
    }
})
const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    username: {
        type: String,
        required: true
    },
    // use ReactionSchema to validate data for reactions
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;