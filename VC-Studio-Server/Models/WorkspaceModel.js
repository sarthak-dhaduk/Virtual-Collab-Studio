import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        primaryKey: true
    },
    Email: {
        type: String,
        required: true
    },
    ProgrammingLanguage: {
        type: String,
        required: true
    },
    CodeSnippet: {
        type: String,
        default: null
    }
}, {
    timestamps: true // Optional: Remove if you don't want createdAt/updatedAt
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;