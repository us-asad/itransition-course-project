import { SEO } from 'components'
import CustomSelect from 'subcomponents/CustomSelect'
import FormField from 'subcomponents/FormField'
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

const Editor = dynamic(() => import("subcomponents/Editor"), { ssr: false });
const TagsField = dynamic(() => import("subcomponents/TagsField"), { ssr: false });
const ImagesUpload = dynamic(() => import("subcomponents/ImagesUpload"), { ssr: false });

export default function CreateLetrev() {
  const [files, setFiles] = useState([]);
  const { handleSubmit } = useForm();

  console.log(files);

  const submitLetrev = () => {
    
  }

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className='custom-container mt-10'>
      <SEO title="Create Your LetREV!" />
      <div className='flex justify-between'>
        <div className='w-[45%]'>
          <div className='py-10 bg-violet-200 border-4 border-dashed border-violet-700 rounded-lg flex items-center justify-center'>
            <ImagesUpload
              files={files}
              setFiles={setFiles}
            />
          </div>
          <div className='flex flex-wrap justify-between gap-y-2 mt-3'>
            {files.map(file => (
              <div key={file.path} className="w-[32%] h-[200px] relative">
                <Image
                  src={file.preview}
                  alt={file.path}
                  layout="fill"
                  objectFit="contain"
                  className='border-2 border-purple-400 rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(submitLetrev)}
          className='w-1/2 flex flex-col gap-3'
        >
          <h1 className='text-[40px] mb-4 font-extrabold'>Create new <span className='text-violet-700'>LetREV</span> 🧾!</h1>
          <FormField
            type="text"
            placeholder="Enter title for letrev"
            label="Title"
          />
          <CustomSelect
            options={categories}
            label="Category"
          />
          <Editor label="Content" placeholder="Add your content here" />
          <TagsField
            label="Tags"
            placeholder="Enter tags about your letrev"
          />
          <button
            type="button"
            className='styled-btn py-4 bg-violet-700 text-[50px] text-white font-extrabold rounded-full mt-10'
          >PUBLISH NOW 🚀</button>
        </form>
      </div>
      <div className="h-[200vh]" />
    </div>
  )
}


const categories = [
  {
    label: "Art",
    value: "art"
  },
  {
    label: "Movies",
    value: "movie"
  },
  {
    label: "Football",
    value: "football"
  }
]
