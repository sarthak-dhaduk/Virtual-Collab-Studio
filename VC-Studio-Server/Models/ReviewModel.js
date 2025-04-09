import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    BlogID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    RatingValue: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

// Ensure one review per user per blog
reviewSchema.index({ BlogID: 1, Email: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review; 