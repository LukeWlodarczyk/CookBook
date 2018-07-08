const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	joinDate: {
		type: Date,
		default: Date.now,
	},
	favourites: {
		type: [Schema.Types.ObjectId],
		ref: 'recipes',
	},
});

module.exports = mongoose.model('users', UserSchema);
