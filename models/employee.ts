const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  salary: { type: String, required: true },
});

// Export the model; Define the model
module.exports = mongoose.model('Employee', employeeSchema);
