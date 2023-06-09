import React, { useState } from 'react';
import {Navigate} from 'react-router-dom'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  const createNewPost = async (ev) => {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file[0]);
    ev.preventDefault();
    const response=await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials:'include',
    });
    if(response.ok){
      setRedirect(true);
    }
  }

  if(redirect){
   return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input type={"Title"}
        placeholder={'title'}
        value={title}
        onChange={ev => { setTitle(ev.target.value) }} />

      <input type={'summary'}
        placeholder={'summary'}
        value={summary}
        onChange={ev => { setSummary(ev.target.value) }} />

      <input type={"file"}
        onChange={ev => { setFile(ev.target.files) }} />

      <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={ev => { setContent(ev) }} />

      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  )
}

export default CreatePage