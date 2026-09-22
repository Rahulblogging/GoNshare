import React ,{useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [showGalleryLock, setShowGalleryLock] = useState(false)
    const [galleryPassword, setGalleryPassword] = useState("")
    const [galleryError, setGalleryError] = useState("")

    //protects from react reload website
    const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);

    try {

        setLoading(true);

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/create-post`,
            formData
        );

        console.log(res.data);

        alert("Photo uploaded successfully!");

        e.target.reset();

    } catch (err) {

        console.log(err);

        alert(
            err.response?.data?.message ||
            "Error uploading photo"
        );

    } finally {

        setLoading(false);
    }
};

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

      <button
        type="submit"
        disabled={loading}
    >
        {loading ? (
            <>
                <span className="loading-spinner"></span>
                Uploading...
            </>
        ) : (
            "Upload Photo 🚀"
        )}
    </button>
    </form>

    <div className="gallery-section">
      <button
      type="button"
      className="View-Gallery"
      onClick={() => {
          navigate("/gallery-lock")
      }}
  >
      🔒 View Gallery
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
        {showGalleryLock && (
  <div className="gallery-lock-overlay">

    <div className="gallery-lock-box">

      <h2>🔒 Private Gallery</h2>

      <p>Enter the password to access the gallery.</p>

      <input
        type="password"
        placeholder="Enter gallery password"
        value={galleryPassword}
        onChange={(e) => setGalleryPassword(e.target.value)}
      />

      {galleryError && (
        <p className="gallery-error">
          {galleryError}
        </p>
      )}

      <div className="gallery-lock-buttons">

        <button
          type="button"
          onClick={async () => {

            try {

              const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/gallery/unlock`,
                {
                  password: galleryPassword
                }
              );

              sessionStorage.setItem(
                "galleryToken",
                response.data.token
              );

              setGalleryPassword("");
              setShowGalleryLock(false);

              navigate("/posts");

            } catch (error) {

              setGalleryError(
                error.response?.data?.message ||
                "Unable to unlock gallery"
              );

            }

          }}
        >
          Unlock
        </button>

        <button
          type="button"
          onClick={() => {
            setShowGalleryLock(false)
            setGalleryPassword("")
            setGalleryError("")
          }}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}
  </section>
  
  
)
}

export default CreatePost