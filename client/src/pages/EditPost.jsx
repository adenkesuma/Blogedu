import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"

import Editor from "../Editor"

export default function EditPost() {
  const {id} = useParams()
  const [title,setTitle] = useState('')
  const [summary,setSummary] = useState('')
  const [content,setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirect,setRedirect] = useState(false)

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title)
          setContent(postInfo.content)
          setSummary(postInfo.summary)
        })
      })
  }, [])

  async function updatePost(ev) {
    ev.preventDefault()

    const data = new FormData()

    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('id', id)

    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form className="post-change" onSubmit={updatePost}>
      <h1 className="post-change__heading">Edit post</h1>

      <div className="post-change__box">
        <label htmlFor="title" className="post-change__label">Title</label>
        <textarea 
          id="title"
          className="post-change__title"
          type="title"
          value={title}
          rows={5}
          onChange={ev => setTitle(ev.target.value)} 
        ></textarea>
      </div>

      <div className="post-change__box">
        <label htmlFor="summary" className="post-change__label">Sumary</label>
        <textarea 
          className="post-change__summary"
          type="summary"
          rows={10}
          id="summary"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
        ></textarea>
      </div>

      <div className="post-change__box">
        <label htmlFor="file" className="post-change__label">Image file</label>
        <input 
          className="post-change__file"
          id="file"
          type="file"
          onChange={ev => setFiles(ev.target.files)} 
        />
      </div>

      <Editor 
        className="post-change__editor"
        value={content} 
        onChange={setContent} 
      />

      <button className="post-change__button" type="submit" rows={30}>Create post</button>
    </form>
  );
}
