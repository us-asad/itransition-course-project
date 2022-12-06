import { useState, useRef, useEffect } from "react";
import { FaDropbox } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';

export default function ImagesUpload({ files, setFiles }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 5,
    // maxSize: 8000000,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  // const [dropping, setDropping] = useState(false);

  return (
    <div
      {...getRootProps({
        className: 'font-bold flex flex-col items-center gap-3 relative w-full h-full justify-center'
      })}
    >
      <div className="flex text-[20px] items-center gap-3">
        <FaDropbox className="text-[30px]" />
        <span>Drag and Drop Files to Upload</span>
      </div>
      <span className="font-medium">Or</span>
      <input
        type="file"
        multiple
        {...getInputProps()}
        accept="image/png, image/jpeg"
      />
      <button
        className="styled-btn px-4 py-1.5 bg-violet-700 text-white rounded-md"
      >Select Files</button>
      <ul className="list-disc text-gray-600 mt-7">
        <li>Up to 5 images</li>
        <li>max size 8MB for each file</li>
        <li>only PNG, JPG and JPEG formats are allowed</li>
      </ul>
      {/* {dropping && <div
        className="absolute w-full h-full bg-[#6d28d959] text-white text-[40px] grid place-content-center"
      >Drop here</div>} */}
    </div>
  );
};