import React from "react";

export const Select = ({options, defaultValue, onChange}) => {
    return(
        <select className="dataTable-selector "
        defaultValue = {defaultValue}
        onChange={event => onChange(event.target.value)}
        >
        {
        options.map(option => (
        <option value={option.type} key={options.indexOf(option)}>{option.name}  </option>
         ))
         }
        </select>
    );
}
