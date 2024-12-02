// src/components/Notification.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faExclamationCircle, 
  faInfoCircle, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import './Notification.css';

interface Props {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<Props> = ({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'error':
        return faExclamationCircle;
      case 'info':
        return faInfoCircle;
    }
  };

  return (
    <div className={`notification ${type} ${isExiting ? 'exit' : ''}`}>
      <FontAwesomeIcon icon={getIcon()} className="notification-icon" />
      <p>{message}</p>
      <button onClick={() => setIsExiting(true)} className="close-button">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Notification;
