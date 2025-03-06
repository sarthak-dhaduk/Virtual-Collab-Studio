import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        primaryKey: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10 digit number!`
        }
    },
    password: {
        type: String,
        required: true
    }
});

const Authentication = mongoose.model('Authentication', authSchema);

// Use default export
export default Authentication;
