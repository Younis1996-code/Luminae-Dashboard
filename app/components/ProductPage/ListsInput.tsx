import { Add, AddAPhoto, Close } from "@mui/icons-material";
import { Button, Fab, InputBase, Typography } from "@mui/material";
import { useField } from "formik";
import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";


interface ListsInputProps{
  label:string;
  name:string
}

const ListsInput = ({label,name} : ListsInputProps) => {
  const [field, meta, helpers] = useField<{text:string,icon:string}[]>({ name });
  const [listItems,setListItems] = React.useState<{text:string,icon:string}[]>(field.value || [])
  const [currentItem,setCurrentItem] = useState<string>('');
  const [icon,setIcon] = useState<string>('')
  const [uploading,setUploading] = useState(false);
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconSet =async (e : ChangeEvent<HTMLInputElement>)=>{
    const file = e.target?.files?.[0];
    if(!file) return

    setUploading(true);
    
    const data =new FormData();
    data.append('image',file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=12766f05f1803f50bf806371318faa61`,{method:'POST',body:data})
    const stat = await res.json();
    console.log(stat)
    if(stat?.success)
      {setIcon(stat.data.url)}
    setUploading(false);
  }

  const addItem = ()=>{
    if(currentItem.trim() == '') return;
    if(!icon) return;
    
    const newItem : {text:string,icon:string} = {
      text:currentItem,
      icon:icon
    }

    const newItems = [...listItems,newItem];
    setListItems(newItems);
    helpers.setValue(newItems)
    resetInputs();
  }

  const resetInputs = ()=>{
    setCurrentItem('');
    setIcon('')
  }
  useEffect(() => {
    setListItems(field.value || []);
  }, [field.value]);
  return (
    <div>
      <Typography fontWeight={'800'}>
        {label}
      </Typography>
      <div className="flex items-center justify-between flex-nowrap">
        <InputBase 
        className="border border-blue-700 rounded-md px-2"
        placeholder="Add item"
        onChange={(e)=>setCurrentItem(e.target.value)}
        value={currentItem}
        /> 
        <div >
          <input 
            type="file"
            className="hidden"
            ref={imgInputRef}
            onChange={(e)=>handleIconSet(e as React.ChangeEvent<HTMLInputElement>)}
          />
          {
            icon ? 
            <img src={icon} alt="image" className="w-8 h-8 border border-blue-700 cursor-pointer"
            onClick={()=>{imgInputRef.current?.click()}}/>
            :
            <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<AddAPhoto />}
            onClick={()=>{imgInputRef.current?.click()}}
          >
           {uploading? '...uploading' : 'icon'}
          </Button>
          }
        </div>
        <Fab color="primary" aria-label="add" size="small"
        onClick={addItem}>
        <Add />
        </Fab>
      </div>
          { meta.error && meta.touched &&
          <p className="text-red-700">{meta.error}</p> }

      <div className="display_list flex flex-col gap-2 mt-3">
        {listItems.map((feature, index) => (
          <div
            key={index}
            className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
            flex items-center justify-between gap-4 py-2 px-3 w-full hover:bg-gray-200 duration-200"
          >
            <div className="flex items-center gap-4">
              <p>{feature.text}</p>
              <img src={feature.icon} alt={feature.text} className="w-8 h-8"/>
            </div>
            <button
              type="button"
              onClick={() => {
                const newItems = listItems.filter((item)=>item.text != feature.text);
                setListItems(newItems);
                helpers.setValue(newItems); 
              }}
              className="text-base text-red-600 cursor-pointer  rounded-lg bg-gray40 h-8 w-8 flex items-center justify-center
              hover:bg-gray30 duration-200"
            >
              <Close className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListsInput
