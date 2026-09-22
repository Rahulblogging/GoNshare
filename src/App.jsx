import React,{useEffect} from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import SendFile from './pages/SendFile'
import ReceiveFile from './pages/ReceiveFile'
import GalleryLock from './pages/GalleryLock'

const App = () => {
    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/wake-up`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Backend wake-up:", data);
            })
            .catch((err) => {
                console.log("Backend wake-up failed:", err);
            });

    }, []);
  return (
    <Router>
      <Routes>
        <Route path= '/create-post' element = {<CreatePost />}/>
        <Route path="/gallery-lock" element={<GalleryLock />} />
        <Route path= '/posts' element = {<Feed />}/>
        <Route path= '/' element = {<CreatePost />}/>
        <Route path= '/send-file' element = {<SendFile />}/>
        <Route path= '/receive-file' element = {<ReceiveFile />}/>

      </Routes>
    </Router>

  )
}

export default App