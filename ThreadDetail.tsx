import './ThreadDetail.css'
import { threadList } from "./data";
import { useState } from 'react';


type Comment = {
  id: number;
  content: string;
};

type AddCommProps = {
  onAddComm: (content: string) => void;
};

function AddComm({ onAddComm }: AddCommProps) {
  const [content, setContent] = useState('');
  return (
    <>
      <input
        placeholder="Add Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={() => {
        setContent('');
        onAddComm(content);
      }} disabled={content === ''}>Add</button>
    </>
  );
}

type TaskProps = {
  comm: Comment;
  onChange: (nextComm: Comment) => void;
  onDelete: (commId: number) => void;
};

function Task({ comm, onChange, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  let commContent;
  if (isEditing) {
    commContent = (
      <>
        <input value={comm.content} onChange={(e) => {
          onChange({
            ...comm,
            content: e.target.value,
          });
        }} />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    commContent = (
      <>
        {comm.content}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      {commContent}
      <button onClick={() => onDelete(comm.id)}>Delete</button>
    </label>
  );
}

type CommListProps = {
  comms: Comment[];
  onChangeComm: (nextComm: Comment) => void;
  onDeleteComm: (commId: number) => void;
};

function CommList({ comms, onChangeComm, onDeleteComm }: CommListProps) {
  return (
    <ul>
      {comms.map((comm) => (
        <li key={comm.id}>
          <Task comm={comm} onChange={onChangeComm} onDelete={onDeleteComm} />
        </li>
      ))}
    </ul>
  );
}

let nextId = 1;
const commentList: Comment[] = [
  { id: 0, content: 'Great' },
];

function CommentApp() {
  const [comms, setComms] = useState<Comment[]>(commentList);

  function handleAdd(content: string) {
    setComms([
      ...comms,
      {
        id: nextId += 1,
        content: content,
      },
    ]);
  }

  function handleChange(nextComm: Comment) {
    setComms(comms.map((c) => {
      if (c.id === nextComm.id) {
        return nextComm;
      } else {
        return c;
      }
    }));
  }

  function handleDelete(commId: number) {
    setComms(
      comms.filter((c) => c.id !== commId)
    );
  }

  return (
    <>  
      <AddComm onAddComm={handleAdd} />
      <CommList comms={comms} onChangeComm={handleChange} onDeleteComm={handleDelete} />
    </>
  );
}

type GalleryProps = {
  onClose: () => void;
  index: number;
};


export default function Gallery({onClose, index}: GalleryProps) {
  let thread = threadList[index];
  return (
      <>
      <div className="blur-background" onClick={onClose}></div>
      <div className='main-detail'>
        <button className='handle' onClick={onClose}>Back to home</button>
        <h2 className='detail-title'>
          <i>{thread.title} </i> 
          by {thread.author}
        </h2>
        <h3 className='index'> ({index + 1} of {threadList.length}) </h3>
        <p className='details'>{thread.detail}</p>
        <CommentApp />
      </div>
      </>
  );
}