import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

/**
 * Confirmation Modal Component
 * Reusable modal for delete confirmations and other actions
 */
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger', 'warning', 'info'
  isLoading = false
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      buttonClass: 'btn-danger'
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      buttonClass: 'bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg'
    },
    info: {
      icon: AlertTriangle,
      iconColor: 'text-blue-500',
      buttonClass: 'btn-primary'
    }
  };

  const currentType = typeStyles[type];
  const IconComponent = currentType.icon;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="modal-content">
        <div className="glass-card rounded-xl p-6 animate-bounce-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-gray-100 ${currentType.iconColor}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              disabled={isLoading}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="btn-secondary order-2 sm:order-1"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`${currentType.buttonClass} order-1 sm:order-2 flex items-center justify-center min-w-[100px]`}
            >
              {isLoading ? (
                <div className="loading-spinner w-4 h-4 border-white"></div>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;