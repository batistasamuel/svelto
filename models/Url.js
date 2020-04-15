const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: { 
    type: String, 
    required: true 
  },
  shortUrl: String,
  friendlyName: String,
  friendlyCode: String,
  category: String,
  expByVisitNumber: {
    type: Boolean,
    default: false
  },
  expByTimePeriod: {
    type: Boolean,
    default: false
  },
  limitVisits: Number, 
  startDate: { type: String, default: Date },
  endDate: { type: String, default: Date },
  visitorCounter: Number,
  lastVisit:{
    type: Date,
    default: Date.now,
  },
  isValid: {
    type: Boolean,
    default: true
  },
  date: { type: String, default: Date.now }
});


urlSchema.pre('save', function(next) {
  this.lastVisit = {type: String, default: Date.now};
  return next();
});




module.exports = mongoose.model('Url', urlSchema);
