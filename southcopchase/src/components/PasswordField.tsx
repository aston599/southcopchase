// src/components/PasswordField.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PasswordField: React.FC<Props> = ({ value, onChange, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      <FontAwesomeIcon icon={faLock} className="input-icon" />
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Şifre"
        disabled={disabled}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
  );
};

export default PasswordField;
