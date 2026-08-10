import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import SendFile from './pages/SendFile'
import ReceiveFile from './pages/ReceiveFile'

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path= '/create-post' element = {<CreatePost />}/>
        <Route path= '/posts' element = {<Feed />}/>
        <Route path= '/' element = {<CreatePost />}/>
        <Route path= '/send-file' element = {<SendFile />}/>
        <Route path= '/receive-file' element = {<ReceiveFile />}/>

      </Routes>
    </Router>

  )
}

export default App