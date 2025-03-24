import React from 'react';

export function Select({ options = [] }) {
  // Verifica que `options` no sea undefined ni null y sea un array
  if (!Array.isArray(options)) {
    console.error('Options should be an array');
    options = [];
  }

  return (
    <select>
      {options.length > 0 ? (
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <option disabled>No hay opciones disponibles</option>
      )}
    </select>
  );
}
