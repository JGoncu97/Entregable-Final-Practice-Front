import React from 'react'

export const Select = ({option, value, name, onChange}) => {
    return (
      <div>
          <select
              value={option}
              onChange={onChange}  
              className="w-full sm:w-72 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">{name}</option>
              {value.map((prod, index) => (
                  <option key={index} value={prod.name}>{prod.name}</option>
              ))}
          </select>
      </div>
    );
  }
  