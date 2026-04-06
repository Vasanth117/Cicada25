import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  gradient = false, 
  hover = true,
  padding = 'p-6' 
}) => {
  const baseClasses = `
    rounded-xl shadow-lg border transition-all duration-300
    ${gradient 
      ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' 
      : 'bg-gray-800 border-gray-700'
    }
    ${hover ? 'hover:border-gray-600 hover:shadow-xl' : ''}
    ${padding}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default Card;