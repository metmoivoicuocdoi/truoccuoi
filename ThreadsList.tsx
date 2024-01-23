import { threadList } from './data';
import './ThreadList.css';
import { useState } from 'react';
import Gallery from './ThreadDetail';
import { Button, Card, CardContent, CardMedia, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function ThreadList() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(0);
  const handleShow = (currentIndex: number) => () => {
    setShow(!show);
    setSelected(currentIndex);
  }
  const listCard = threadList.map((thread) => (
    <li className='card' key={thread.id}>
      <div className="card-content">
        <img className='img' src={thread.url} alt={thread.title}></img>
        <div className="text-content">
          <h2 className='title'>{thread.title}</h2>
          <h6 className='author'>{thread.author}</h6>
          <p className='description'>{thread.description}</p>
          <button className='more' onClick={handleShow(thread.id)}>View details</button>
        </div>
      </div>
    </li>
  ));
  return (
    <>
    <article className='main-part'>
      <h1 className='vital'>Thread List</h1>
      <ul className='list-of-card'>{listCard}</ul>
      {show && <Gallery onClose = {handleShow(selected)} index={selected}/>}
    </article>
    </>
  );
}