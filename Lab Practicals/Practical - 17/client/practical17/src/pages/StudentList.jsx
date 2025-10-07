import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Users, BookOpen, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { studentAPI } from '../api/studentAPI';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

/**
 * StudentList Component
 * Main dashboard showing all students in a beautiful table format
 */
const StudentList = () => {
  // State management
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Course options for filtering
  const courseOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'Computer Science', 'English', 'Economics', 'Accountancy'
  ];

  /**
   * Fetch all students from the API
   */
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getAllStudents();
      setStudents(response.data || []);
      toast.success(`Loaded ${response.count || 0} students`);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error(error.message || 'Failed to load students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle student deletion
   */
  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;
    
    try {
      setDeleteLoading(true);
      await studentAPI.deleteStudent(selectedStudent._id);
      
      // Update local state
      setStudents(prev => prev.filter(student => student._id !== selectedStudent._id));
      
      toast.success(`${selectedStudent.name} has been removed`);
      setShowDeleteModal(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error(error.message || 'Failed to delete student');
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Handle successful student addition
   */
  const handleStudentAdded = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
    setShowAddModal(false);
  };

  /**
   * Handle successful student update
   */
  const handleStudentUpdated = (updatedStudent) => {
    setStudents(prev => 
      prev.map(student => 
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
    setShowEditModal(false);
    setSelectedStudent(null);
  };

  /**
   * Filter students based on search term and course
   */
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm);
    const matchesCourse = selectedCourse === '' || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  /**
   * Format fees for display
   */
  const formatFees = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Load students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading students..." size="lg" />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="glass-card rounded-xl p-6 fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Student Management
            </h1>
            <p className="text-gray-600">
              Manage student records, fees, and course enrollments
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex gap-4">
            <div className="glass-card rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="glass-card rounded-lg p-4 text-center">
              <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">
                {new Set(students.map(s => s.course)).size}
              </p>
              <p className="text-sm text-gray-600">Active Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="glass-card rounded-xl p-6 slide-up">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-glass w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Course Filter */}
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="input-glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              {courseOptions.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          {/* Add Student Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="glass-card rounded-xl overflow-hidden bounce-in">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              {students.length === 0 ? 'No Students Found' : 'No Matching Students'}
            </h3>
            <p className="text-gray-400 mb-6">
              {students.length === 0 
                ? 'Get started by adding your first student'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {students.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                Add First Student
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Student Info</th>
                  <th className="table-header">Contact</th>
                  <th className="table-header">Course</th>
                  <th className="table-header">Fees</th>
                  <th className="table-header">Admission Date</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student._id} className={`table-row ${index % 2 === 0 ? 'bg-white/50' : 'bg-blue-50/30'}`}>
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">ID: {student._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div>
                        <p className="text-gray-900">{student.email}</p>
                        <p className="text-sm text-gray-500">{student.phone}</p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {student.course}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className="font-semibold text-green-600">
                        {formatFees(student.fees)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className="text-gray-600">
                        {formatDate(student.dateOfAdmission)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowEditModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results Info */}
      {filteredStudents.length > 0 && (
        <div className="text-center text-gray-600">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddStudent
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onStudentAdded={handleStudentAdded}
        />
      )}

      {showEditModal && selectedStudent && (
        <EditStudent
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
          onStudentUpdated={handleStudentUpdated}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleDeleteStudent}
        title="Delete Student"
        message={`Are you sure you want to delete ${selectedStudent?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default StudentList;