 import React from 'react';

 export default function NumberSelect({ value, options, label, onChange }) {
   function onChangeOption(e) {
     const value = Number(e.currentTarget.value);
     onChange(value);
   }

   return (
       <div>
         <select onChange={onChangeOption} value={value}>
           {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
           ))}
         </select>
         {label}
       </div>
   );
}
