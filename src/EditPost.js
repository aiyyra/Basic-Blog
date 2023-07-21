import { useState,useEffect,useContext } from "react"
import { useParams,Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import api from './api/posts'
import DataContext from './context/DataContext'
//handleEdit, editBody, setEditBody, editTitle, setEditTitle
const EditPost = () => {
    
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { posts,setPosts } = useContext(DataContext)
    const navigate = useNavigate()
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() => {
        if(post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post, setEditBody, setEditTitle])

    const handleEdit = async (post,id) => {
        const datetime = format(new Date(), 'MMM dd, yyyy pp')
        const updatedPost = { id, title: editTitle, datetime, body: editBody}
        try {
          const response = await api.put(`./posts/${id}`, updatedPost)
          setPosts(posts.map(post => post.id === id ? {...response.data} : post))
          setEditTitle('')
          setEditBody('')
          navigate('/')
        }  catch (err) {
          console.log(`Error: ${err.message}`)
        }
      }

  return (
    <main className="NewPost">
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                    id="postTitle"
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                    id="postBody"
                    required
                    value={editBody}
                    onChange={(e) =>setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={()=> handleEdit(post,id)}>Edit</button>
                </form>
            </>
        }
        {!editTitle &&
            <>
                <h2>Post not found</h2>
                <p>
                    <Link to={'/'}>Home</Link>
                </p>
            </>

        }
      
    </main>
  )
}

export default EditPost