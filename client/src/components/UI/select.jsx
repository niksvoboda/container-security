import React from "react";

export const Select = ({options, defaultValue, onChange}) => {
    return(
        <select className="dataTable-selector"
        onChange={event => onChange(event.target.value)}
        >
        {defaultValue && <option disabled >{defaultValue}</option>}
        {
        options.map(option => (
        <option value={option.type} key={options.indexOf(option)}>{option.name}  </option>
         ))
         }
        </select>
    );
}
