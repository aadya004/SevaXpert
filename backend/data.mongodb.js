const express = require('express')
const mongoose = require('mongoose');
const path=require('path')
const app = express()
const port = 3000



mongoose.connect("mongodb://127.0.0.1:27017/new", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




const OTPSchema = new mongoose.Schema({
    emailOrPhone: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true } // OTP expiration time (e.g., 5 min)
});

module.exports = mongoose.model('OTP', OTPSchema);





const SchemeSchema = new mongoose.Schema({
  schemeName: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  eligibilityCriteria: { type: String, required: true },
  applicationURL: { type: String },
  requiredDocuments: { type: [String] }, // List of document names
  contactDetails: { type: String },
  languageSupport: { type: [String] }, // List of supported languages
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scheme', SchemeSchema);





const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentName: { type: String, required: true },
  documentURL: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);




const UserEligibilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
  isEligible: { type: Boolean, default: false },
  reason: { type: String } // If not eligible, store reason
});

module.exports = mongoose.model('UserEligibility', UserEligibilitySchema);





const UserSchema = new mongoose.Schema({
    aadharNumber: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    income: { type: Number, required: true },
    caste: { type: String, enum: ['General', 'OBC', 'SC', 'ST'], required: true },
    state: { type: String, required: true },
    city: { type: String },
    phoneNumber: { type: String, unique: true, required: true },
    languagePreference: { type: String, enum: ['Hindi', 'English', 'Tamil', 'Marathi', 'Bengali', 'Other'], default: 'English' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);



const SchemeApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
  applicationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  submittedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SchemeApplication', SchemeApplicationSchema);


const ChatbotInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  botResponse: { type: String, required: true },
  interactionTimestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatbotInteraction', ChatbotInteractionSchema);




const AadharVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aadharNumber: { type: String, unique: true, required: true },
  isVerified: { type: Boolean, default: false },
  verifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AadharVerification', AadharVerificationSchema);






