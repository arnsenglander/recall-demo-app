import React from 'react';
import './styles.css';

interface ChipProps {
    label: string;
    color: string;
    icon?: React.ReactNode;
}

const Chip = ({ label, color, icon }: ChipProps) => (
    <div className="chip" style={{ backgroundColor: color }}>
        {!!icon && (icon)}
      {label}
    </div>
);

export default Chip;