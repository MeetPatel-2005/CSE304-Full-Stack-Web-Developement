import React, { useState } from 'react';
import { X, User, Mail, Phone, BookOpen, DollarSign, Calendar, Save, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { studentAPI } from '../api/studentAPI';

/**
 * AddStudent Component
 * Modal form for adding new students with validation
 */
const AddStudent = ({ isOpen, onClose, onStudentAdded }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    fees: '',
    dateOfAdmission: new Date().toISOString().split('T')[0] // Today's date
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Course options
  const courseOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Computer Science', 'English', 'Economics', 'Accountancy'
  ];

  /**
   * Handle input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    // Fees validation
    if (!formData.fees) {
      newErrors.fees = 'Fees amount is required';
    } else if (isNaN(formData.fees) || parseFloat(formData.fees) < 0) {
      newErrors.fees = 'Fees must be a positive number';
    } else if (parseFloat(formData.fees) > 100000) {
      newErrors.fees = 'Fees cannot exceed ₹1,00,000';
    }

    // Date validation
    if (!formData.dateOfAdmission) {
      newErrors.dateOfAdmission = 'Admission date is required';
    } else if (new Date(formData.dateOfAdmission) > new Date()) {
      newErrors.dateOfAdmission = 'Admission date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setLoading(true);

      // Prepare data for API
      const studentData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        fees: parseFloat(formData.fees),
        dateOfAdmission: new Date(formData.dateOfAdmission).toISOString()
      };

      const response = await studentAPI.createStudent(studentData);
      
      toast.success(`${studentData.name} has been added successfully!`);
      onStudentAdded(response.data);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        fees: '',
        dateOfAdmission: new Date().toISOString().split('T')[0]
      });
      
    } catch (error) {
      console.error('Error adding student:', error);
      
      // Handle validation errors from backend
      if (error.message.includes('email already exists') || error.message.includes('duplicate')) {
        setErrors({ email: 'A student with this email already exists' });
      } else {
        toast.error(error.message || 'Failed to add student');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle modal close
   */
  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        fees: '',
        dateOfAdmission: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={handleClose}></div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-bounce-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Student</h2>
                <p className="text-sm text-gray-600">Fill in the student details below</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter student's full name"
                disabled={loading}
                className={`input-glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                disabled={loading}
                className={`input-glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                disabled={loading}
                className={`input-glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Course and Fees Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Field */}
              <div>
                <label htmlFor="course" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Course *</span>
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`input-glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.course ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                >
                  <option value="">Select a course</option>
                  {courseOptions.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
              </div>

              {/* Fees Field */}
              <div>
                <label htmlFor="fees" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Monthly Fees (₹) *</span>
                </label>
                <input
                  type="number"
                  id="fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  placeholder="Enter fees amount"
                  min="0"
                  max="100000"
                  step="1"
                  disabled={loading}
                  className={`input-glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fees ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                {errors.fees && <p className="mt-1 text-sm text-red-600">{errors.fees}</p>}
              </div>
            </div>

            {/* Admission Date Field */}
            <div>
              <label htmlFor="dateOfAdmission" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Date of Admission *</span>
              </label>
              <input
                type="date"
                id="dateOfAdmission"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
                disabled={loading}
                className={`input-glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dateOfAdmission ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.dateOfAdmission && <p className="mt-1 text-sm text-red-600">{errors.dateOfAdmission}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-success flex-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Adding Student...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Add Student
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudent;