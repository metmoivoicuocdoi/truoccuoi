import './navigation.css'; // Import your CSS file
import { AppBar, Toolbar, Typography, Container, Button, Paper, CssBaseline, Grid } from '@mui/material';
import { useState } from 'react';
import { threadList } from './data';

function Logo() {
  return (
    <div className="logo-container">
      <img
        src="https://png.pngtree.com/template/20191101/ourlarge/pngtree-letter-m-and-h-logo-in-hexagon-image_326574.jpg"
        alt="Logo"
        className="circular-logo"
        width="70"
        height="70"
      />
      <h1 className="title">Haha Forum</h1>
    </div>
  );
}

function Login() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateVisible, setCreateVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [post, setPost] = useState(threadList);

  const handleCreatePost = () => {
    setCreateVisible(true);
  }

  const handleLoginClick = () => {
    setPopupVisible(true);
  };

  const handleRegister = () => {
    // Implement registration logic here with the entered username
    alert(`Registered with username: ${username}`);
    setIsLoggedIn(true);
    setPopupVisible(false);
  };

  const handleCloseCreate = () => {
    setCreateVisible(false);
  }

  const handleCloseClick = () => {
    setPopupVisible(false);
  };

  let nextPostID = threadList.length;
  const onAddPost = (title: string, content: string, description: string) => {
    const newPost = {
      id: nextPostID + 1,
      url: 'https://png.pngtree.com/template/20191101/ourlarge/pngtree-letter-m-and-h-logo-in-hexagon-image_326574.jpg',
      title: title,
      author: username,
      description: description,
      detail: content,
    };
    setPost([...post, newPost]);
    setCreateVisible(false);
  };

  return (
    <>
      {isLoggedIn? 
      (
        <>
        <button className='create-button' onClick={handleCreatePost}>Create Post</button>
        {isCreateVisible && (
          <>
          <div className='overlay' onClick={handleCloseCreate}/>
          <div className='popup'>
            <h2>Create Post</h2>
            <input type='text' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='text' placeholder='Enter content' value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={() => onAddPost(title, content, description)} disabled={title===''||description===''||content===''}>Post</button>
          </div>
          </>
        )}
        <h3>Hi, {username}</h3>
        </>
      ):
      <button className="login-button" onClick={handleLoginClick}>Login</button>}
      {isPopupVisible && (
        <>
          <div className="overlay" onClick={handleCloseClick} />
          <div className="popup">
            <h2>Register</h2>
            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <div className="direct">
              <button onClick={handleRegister} disabled={username === ''}>Register</button>
              <button onClick={handleCloseClick}>Close</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}


function FirstBar() {
    return (
        <>
        <div className="first-bar">
            <Logo />
            <Login />
        </div>
        </>
    )
}

function Search() {
  return <textarea className="search-textarea" placeholder="Search..."></textarea>;
}

export default function NavigationBar() {
  return (
    <div className="navigation-bar">
      <FirstBar />
      <Search />
    </div>
  );
}
