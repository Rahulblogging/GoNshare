import React, { useState,useEffect } from 'react'
import axios from "axios"
import { useNavigate, useNavigation } from 'react-router-dom'
import { MdOutlineFileDownload } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import { VscScreenFull } from "react-icons/vsc";
import DownloadImage from '../components/download-img';



const Feed = () => {

    const navigate = useNavigate();

    const [fullPhoto, setFullPhoto] = useState(false); //full image on original

    const [selectedImage, setSelectedImage] = useState(null); // new full image

    const [liked , setLiked ] = useState(false);

    const [posts, setPosts] = useState([
        {
            _id:"1",
            image:"https://ik.imagekit.io/gtfvu2lx33/image_vS_ljuFz3.jpg",
            caption:"Beautiful"
        }
    ])

useEffect(() => {

    const galleryToken = sessionStorage.getItem("galleryToken");

    if (!galleryToken) {
        navigate("/create-post");
        return;
    }

    axios.get(
        `${import.meta.env.VITE_API_URL}/posts`,
        {
            headers: {
                "x-gallery-token": galleryToken
            }
        }
    )
    .then((res) => {

        setPosts(res.data.posts);

    })
    .catch((err) => {

        if (err.response?.status === 401) {
            sessionStorage.removeItem("galleryToken");
            navigate("/create-post");
        }

    });

}, [navigate]);



  return (
    <section className='feed-section'>

    <div className="back-section">
      <button type='button' onClick={()=>{
        navigate("/create-post")
      }}>
        ⮜⮜ Back to upload File ⮜⮜
      </button>
    </div>



    {
        posts.length > 0 ? (
            posts.map((post)=>(

                <div key= {post._id} className="post-card">
                    <div className="image-container">
                        <img
                        src={`${import.meta.env.VITE_API_URL}${post.image}`}
                        className={fullPhoto === post._id ? "full-photo" : ""}
                        alt={post.caption}
                        onClick={() =>
                            setFullPhoto(
                                fullPhoto === post._id ? null : post._id
                            )
                        }
                    />
                        <VscScreenFull
                        className='fullscreen-icon' 
                        color='black' 
                        size={28}  
                        onClick={()=> setSelectedImage(post.image)}
                        />
                    </div>
                    <div className='caption-bar'>
                        <h1>
                            <SlLike 
                            className= {liked ? "liked" : ""}
                            onClick={()=>setLiked(!liked)}
                            
                            />
                        </h1>
                        <p>{post.caption}</p>
                        <h2>
                            <MdOutlineFileDownload 
                            className="download-icon"
                            onClick={()=> DownloadImage(post.image,post.caption)}
                            />
                        </h2>

                    </div>
                </div>
            ) )
        ) : (
            <h1>No posts available</h1>
        )
    }

    {selectedImage && (
  <div
    className="image-popup"
    onClick={() => setSelectedImage(null)}
  >
    <img
      src={selectedImage}
      alt="Full size"
    />
  </div>
)}

    </section>
  )
}

export default Feed