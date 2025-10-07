import mongoose from 'mongoose';

/**
 * Student Schema for the Tuition Class Admin Panel
 * Contains all student information including personal details and course info
 */
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^[0-9]{10}$/,
      'Please provide a valid 10-digit phone number'
    ]
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    enum: {
      values: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Economics', 'Accountancy'],
      message: 'Please select a valid course'
    }
  },
  fees: {
    type: Number,
    required: [true, 'Fees amount is required'],
    min: [0, 'Fees cannot be negative'],
    max: [100000, 'Fees cannot exceed ₹1,00,000']
  },
  dateOfAdmission: {
    type: Date,
    required: [true, 'Date of admission is required'],
    default: Date.now
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field to format fees with currency symbol
studentSchema.virtual('formattedFees').get(function() {
  return `₹${this.fees.toLocaleString('en-IN')}`;
});

// Virtual field to format admission date
studentSchema.virtual('formattedAdmissionDate').get(function() {
  return this.dateOfAdmission.toLocaleDateString('en-IN');
});

// Index for faster queries (email already has unique index)
studentSchema.index({ course: 1 });

const Student = mongoose.model('Student', studentSchema);

export default Student;