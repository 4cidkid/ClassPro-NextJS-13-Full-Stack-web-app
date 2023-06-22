"use client";
import { useState } from "react";

const Uploader = () => {
  const [selectedFile,setSelectedFile] = useState("")
  
  const upload = async (e) => {
    e.preventDefault()
    try{
      if(!selectedFile) return
      const formData = new FormData
      formData.append('file',selectedFile)
      await fetch('/api/photos',{
        method:'POST',
        body: formData
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        onChange={(({target}) => {
          if(target.files){
            const file = target.files[0]
            setSelectedFile(file)
          }
        })}
        type="file"
        accept="image/png, image/jpeg"
      />
      <button onClick={upload}>Send</button>
    </>
  );
};

export default Uploader;
