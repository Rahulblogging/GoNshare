import React from 'react'
import axios from "axios"
import { useNavigate, useNavigation } from 'react-router-dom'

const CreatePost = () => {

    const navigate = useNavigate()

    //protects from react reload website
    const handleSubmit = async (e) =>{
        e.preventDefault()

        const formData = new FormData(e.target)

        axios.post(`${import.meta.env.VITE_API_URL}/create-post`, formData)
        .then((res)=>{
            navigate("/posts")
        })
        .catch((err)=>{
            console.log(err);
            alert("Error Creating Post")
            
        })
    }

  return (
  <section className="create-post-section">
    <form onSubmit={handleSubmit}>

      <h1>📸 PhotoShare</h1>

      <h2>Create New Post</h2>

      <p>Share your memories with everyone.</p>

      <input
        type="file"
        name="image"
        accept="image/*"
        required
      />

      <textarea
        name="caption"
        placeholder="Write something about your photo..."
        required
      ></textarea>

      <button type="submit">
        Upload Photo 🚀
      </button>
    </form>

    <div className="gallery-section">
      <button type='button' className='View-Gallery' onClick={()=>{
        navigate("/posts")
      }}>
        View Gallery
      </button>
      <div className='Send-Recieve'>
        <button 
        type='button'
        onClick={()=>{
          navigate("/send-file")
        }}
        >
          Send File
        </button>
        <button type='button' onClick={()=>{
          navigate("/receive-file")
        }}>
          Receive File
        </button>
      </div>
    </div>

  </section>
  
  
)
}

export default CreatePost