import React, { createContext, useContext, useState, useCallback } from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: Toast['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'], duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const getToastStyles = (type: Toast['type']) => {
    const baseStyles = {
      backgroundColor: COLORS.bg_Colour,
      fontFamily: FONTS.para_01.fontFamily,
      fontSize: FONTS.para_01.fontSize,
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyles,
          borderLeft: `4px solid #10B981`,
          color: '#065F46',
        };
      case 'error':
        return {
          ...baseStyles,
          borderLeft: `4px solid #EF4444`,
          color: '#991B1B',
        };
      case 'warning':
        return {
          ...baseStyles,
          borderLeft: `4px solid #F59E0B`,
          color: '#92400E',
        };
      case 'info':
        return {
          ...baseStyles,
          borderLeft: `4px solid ${COLORS.light_blue}`,
          color: COLORS.text_desc,
        };
      default:
        return baseStyles;
    }
  };

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="min-w-80 max-w-md p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-in slide-in-from-right-full"
            style={getToastStyles(toast.type)}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg font-bold flex-shrink-0">
                {getIcon(toast.type)}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};