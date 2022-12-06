import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

export default function TagsField({ label, placeholder }) {
  const [selected, setSelected] = useState([]);
console.log(selected);
  return (
    <label>
      {label && <span className="font-semibold">{label}:</span>}
      <TagsInput
        value={selected}
        onChange={value => setSelected(value)}
        className="border-2 border-blue-700"
        placeHolder={placeholder || "Enter words"}
      />
    </label>
  )
}
