import Student from '../models/Student.js';
import { validationResult } from 'express-validator';

/**
 * Student Controller - Handles all CRUD operations for students
 * Implements proper error handling and validation
 */

/**
 * @desc    Get all students
 * @route   GET /api/students
 * @access  Public
 */
export const getAllStudents = async (req, res) => {
  try {
    console.log('📋 Fetching all students...');
    
    const students = await Student.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .select('-__v'); // Exclude version field
    
    console.log(`✅ Found ${students.length} students`);
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('❌ Error fetching students:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch students',
      error: error.message
    });
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Fetching student with ID: ${id}`);
    
    const student = await Student.findById(id).select('-__v');
    
    if (!student) {
      console.log('❌ Student not found');
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    console.log(`✅ Student found: ${student.name}`);
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('❌ Error fetching student:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch student',
      error: error.message
    });
  }
};

/**
 * @desc    Create new student
 * @route   POST /api/students
 * @access  Public
 */
export const createStudent = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { name, email, phone, course, fees, dateOfAdmission } = req.body;
    console.log(`📝 Creating new student: ${name}`);
    
    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      console.log('❌ Email already exists');
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists'
      });
    }
    
    const student = await Student.create({
      name,
      email,
      phone,
      course,
      fees,
      dateOfAdmission: dateOfAdmission || Date.now()
    });
    
    console.log(`✅ Student created successfully: ${student.name} (ID: ${student._id})`);
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('❌ Error creating student:', error.message);
    
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `A student with this ${field} already exists`
      });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not create student',
      error: error.message
    });
  }
};

/**
 * @desc    Update student
 * @route   PUT /api/students/:id
 * @access  Public
 */
export const updateStudent = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { id } = req.params;
    const { name, email, phone, course, fees, dateOfAdmission } = req.body;
    console.log(`✏️ Updating student with ID: ${id}`);
    
    // Check if email already exists for another student
    if (email) {
      const existingStudent = await Student.findOne({ 
        email, 
        _id: { $ne: id } 
      });
      
      if (existingStudent) {
        console.log('❌ Email already exists for another student');
        return res.status(400).json({
          success: false,
          message: 'Another student with this email already exists'
        });
      }
    }
    
    const student = await Student.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        course,
        fees,
        dateOfAdmission
      },
      {
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    ).select('-__v');
    
    if (!student) {
      console.log('❌ Student not found for update');
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    console.log(`✅ Student updated successfully: ${student.name}`);
    
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('❌ Error updating student:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not update student',
      error: error.message
    });
  }
};

/**
 * @desc    Delete student
 * @route   DELETE /api/students/:id
 * @access  Public
 */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Deleting student with ID: ${id}`);
    
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      console.log('❌ Student not found for deletion');
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    console.log(`✅ Student deleted successfully: ${student.name}`);
    
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: { id: student._id, name: student.name }
    });
  } catch (error) {
    console.error('❌ Error deleting student:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not delete student',
      error: error.message
    });
  }
};