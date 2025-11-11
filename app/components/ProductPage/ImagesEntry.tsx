import { AddAPhoto, Close } from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import { useField } from "formik";
import { useRef, useState } from "react";


interface ImagesEntryProps{
  label:string;
  name:string;
  id:string;
}


const ImagesEntry = ({label, id, name}: ImagesEntryProps) => {
  const [field, meta, helpers] = useField<string[]>({ name });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const imageInput = useRef<HTMLInputElement | null>(null)
  const handleImagesChanged = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;
    if (!files) return;
    setUploading(true)
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("image",file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=12766f05f1803f50bf806371318faa61`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (data?.success) {
        uploadedUrls.push(data.data.url);
      }
    }
    const newUrls = [...imageUrls,...uploadedUrls]
    setImageUrls(newUrls);
    e.target.value = "";
    setUploading(false)
    helpers.setValue([...(field.value || []), ...uploadedUrls]);
    }

  return (
    <div>
      <div>
        <label htmlFor={id}>
          <Typography fontWeight={'800'}>
            {label}  
          </Typography>
        </label>
        <div className={`w-[70%] p-10 rounded-2xl bg-gray-300 my-3 flex items-center justify-center hover:bg-gray-400 cursor-pointer duration-300 ${uploading ? 'cursor-wait' : 'cursor-pointer'}`}
        onClick={()=>{uploading ? '' : imageInput.current?.click()}}
        >
         <AddAPhoto />
        </div>
        <input 
        ref={imageInput}
        type="file"
        id={id}
        name={name}
        multiple
        accept=".png,.jpg,.jpeg,.webp"
        onChange={(e) => {
          handleImagesChanged(e as React.ChangeEvent<HTMLInputElement>);
        }}
        className="hidden"
        />
        { meta.error && meta.touched &&
          <p className="text-red-700">{meta.error}</p> }
      </div>
      {uploading && (
        <>
          <div className="w-10 h-10 animate-ping rounded-full bg-orange-600 mx-auto m-8" />
          <p>Uploding</p>
        </>
        )}
      <div className="imagesDisplay">
        <div className="grid grid-cols-2 lg-custom:grid-cols-3 gap-3">
          {imageUrls.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = imageUrls.filter((_, i) => i !== index);
                  setImageUrls(updated);
                  helpers.setValue(updated);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity
                 cursor-pointer hover:brightness-90 duration-200"
                aria-label="Remove image"
              >
                <Close />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default ImagesEntry
