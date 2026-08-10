import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { FaRegCopy } from "react-icons/fa6";

const SendFile = () =>{
    const navigate = useNavigate();

    const[file,setFile] = useState(null);
    const [code, setCode ] = useState("");
    
    // generate 6 digit code
    const generateCode = () =>{
        const randomCode = Math.floor(100000 + Math.random()*900000);
        setCode(randomCode.toString());
    };

    //copy to clipboard

    const copyCode = async () =>{
      await navigator.clipboard.writeText(code);
      alert("Code copied!");
    };


    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!file){
            alert("Please choose a file");
            return;
        }

        if (!code){
            alert("Please generate a code");
            return;
        }

        const formData = new FormData();

        formData.append("file",file);
        formData.append("code",code);

        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/send-file`,
                formData
            );
            
            console.log(res.data);
            
            alert("File sent Successfully");
            
        } catch(err){
            console.log(err);
            alert("Error Sending File");
        }
    };
    return (
    <section className="create-post-section">

      <form onSubmit={handleSubmit}>

        <h1>📤 Send File</h1>

        <h2>Share a file securely</h2>

        <p>
          Choose a file and generate a code to send it.
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <div className="code-section">

          <button
            type="button"
            onClick={generateCode}
          >
            Generate Code
          </button>
           <div className="code-input-container">
             <input
            type="text"
            className='code-input'
            value={code}
            placeholder="Your code"
            readOnly
            
          />
          <FaRegCopy 
          className='copy-icon'
          onClick={copyCode}
          />

           </div>
        </div>

        <button type="submit">
          Send File 📤
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

export default SendFile;

    


