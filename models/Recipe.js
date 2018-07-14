const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RecipeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	instructions: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	username: {
		type: String,
		required: true,
	},
});

RecipeSchema.index({ '$**': 'text' });

module.exports = mongoose.model('recipes', RecipeSchema);
