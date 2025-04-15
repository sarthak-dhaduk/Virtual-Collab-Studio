import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ProgrammingLanguage: {
        type: String,
        required: true
    },
    CodeSnippet: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
