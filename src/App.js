import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'date-fns'

function App() {

  const[posts, setPosts] = useState([
    {
      id:1,
      title:"nyam",
      datetime:"Today",
      body:"NYAM"
    },
    {
      id:2,
      title:"nyam",
      datetime:"Tomorrow",
      body:"NYAM"
    },
    {
      id:3,
      title:"nyam",
      datetime:"Yesterday",
      body:"NYAM"
    },
    {
      id:4,
      title:"nyam",
      datetime:"That day",
      body:"NYAM"
    },
  ])
  const [search, setSeacrch] = useState('');
  const [searchResults,setsSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const filteredResult = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setsSearchResults(filteredResult.reverse())
  },[posts,search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length-1] + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    const allPosts = [...posts, newPost];
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')

  }
  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList)
    navigate('/');
  }

  return (
    <div className="App">
      <Header title={'React JS Blog'}/>
      <Nav search={search} setSeacrch={setSeacrch}/>
      <Routes>
        <Route path="/" element={<Home posts={searchResults}/>} />
        <Route path="/post" element={<NewPost 
          handleSubmit={handleSubmit} 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
        />} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Missing/>} />
      </Routes>  
      <Footer/>      
    </div>
  );
}

export default App;
