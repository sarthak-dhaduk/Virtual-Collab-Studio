import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    BlogId: {
        type: String,
        required: true,
    },
    UserEmail: {
        type: String,
        required: true,
    },
    RatingValue: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

// Create a compound index to ensure a user can only review a blog once
reviewSchema.index({ BlogId: 1, UserEmail: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review; 