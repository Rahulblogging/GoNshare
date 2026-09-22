import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { MdOutlineFileDownload } from "react-icons/md";

const ReceiveFile = () =>{
    const navigate = useNavigate();

   const [code, setCode] = useState("");
   const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!code) {
        alert("Please enter the code");
        return;
    }

    try {

        // Start loading
        setLoading(true);

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/receive-file`,
            {
                code: code
            }
        );

        console.log(res.data);

        const fileName = res.data.file.fileName;

        // Download through our backend
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/download-file/${code}`
        );

        if (!response.ok) {
            throw new Error("File download failed");
        }

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

    } catch (err) {

        console.log(err);

        if (err.response) {
            alert(err.response.data.message);
        } else {
            alert("Error receiving file");
        }

    } finally {

        // Stop loading
        setLoading(false);
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

        <button
          type="submit"
          disabled={loading}
      >
          {loading ? (
              <>
                  <span className="loading-spinner"></span>
                  Receiving...
              </>
          ) : (
              <>
                  Receive File <MdOutlineFileDownload />
              </>
          )}
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

    


