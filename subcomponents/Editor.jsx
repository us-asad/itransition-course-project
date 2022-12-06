import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

export default function Editor({ label, placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  console.log(content);
  return (
    <label>
      {label && <span className='font-semibold'>Content:</span>}
      <JoditEditor
        ref={editor}
        value={content}
        config={{
          readonly: false,
          placeholder: placeholder || 'Add content here'
        }}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)}
        // onChange={newContent => setContent(newContent)}
      />
    </label>
  )
}
