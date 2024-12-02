// src/components/Checkbox.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Checkbox.css';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

const Checkbox: React.FC<Props> = ({ checked, onChange, label, disabled }) => {
  return (
    <label className={`checkbox-wrapper ${disabled ? 'disabled' : ''}`}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className="checkbox-custom">
          {checked && <FontAwesomeIcon icon={faCheck} />}
        </div>
      </div>
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default Checkbox;
