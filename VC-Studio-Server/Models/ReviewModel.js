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

const Review = mongoose.model('Review', reviewSchema);

export default Review; 