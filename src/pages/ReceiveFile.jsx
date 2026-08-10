import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { MdOutlineFileDownload } from "react-icons/md";

const ReceiveFile = () =>{
    const navigate = useNavigate();

    const [code, setCode ] = useState("");

    const handleSubmit = async (e) =>{

        e.preventDefault();

        if (!code){
            alert("Please enter the code");
            return;
        }

        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/receive-file`,
                {
                    code:code
                }
            );
            console.log(res.data);
            
            const fileUrl = res.data.file.fileUrl;
            const fileName = res.data.file.fileName;


            //Download File

            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = fileName;

            document.body.appendChild(link);

            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);

            alert("File Received Successfully");


        } catch(err){

            console.log(err);

            if(err.response){
                alert(err.response.data.message);
            }else{
                alert("Error receiving file");
            }
        }
    };
    return (
    <section className="create-post-section">

      <form onSubmit={handleSubmit}>

        <h1>📤 Recieve File</h1>

        <h2>Download a shared file</h2>

        <p>
            Enter the code to recieve your file.
        </p>

        <div className="receive-code-container">

            <input
            type="text"
            className='code-input'
            value={code}
            placeholder="Enter 6-digit code"
            maxLength={6}
            onChange={(e)=> setCode(e.target.value)}
          />

        </div>

        <button type="submit">
          Receive File <MdOutlineFileDownload />
        </button>

      </form>

      <button
        type="button"
        className='back-button'
        onClick={() => navigate("/")}
      >
        Back
      </button>

    </section>
  );
};

export default ReceiveFile;

    


