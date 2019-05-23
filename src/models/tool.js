const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToolSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [String]
});

module.exports = mongoose.model('Tool', ToolSchema);
