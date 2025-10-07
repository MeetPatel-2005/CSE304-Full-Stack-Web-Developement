import express from 'express';
import { body } from 'express-validator';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';

const router = express.Router();

/**
 * Validation rules for student data
 * Used for both create and update operations
 */
const studentValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid 10-digit phone number')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be exactly 10 digits'),
  
  body('course')
    .trim()
    .isIn(['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Economics', 'Accountancy'])
    .withMessage('Please select a valid course'),
  
  body('fees')
    .isNumeric()
    .withMessage('Fees must be a number')
    .isFloat({ min: 0, max: 100000 })
    .withMessage('Fees must be between 0 and 1,00,000'),
  
  body('dateOfAdmission')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date')
    .toDate()
];

/**
 * Student Routes
 * All routes are prefixed with /api/students
 */

// @route   GET /api/students
// @desc    Get all students
// @access  Public
router.get('/', getAllStudents);

// @route   GET /api/students/:id
// @desc    Get single student by ID
// @access  Public
router.get('/:id', getStudentById);

// @route   POST /api/students
// @desc    Create new student
// @access  Public
router.post('/', studentValidationRules, createStudent);

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Public
router.put('/:id', studentValidationRules, updateStudent);

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Public
router.delete('/:id', deleteStudent);

export default router;