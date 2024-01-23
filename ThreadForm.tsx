// src/components/ThreadForm.tsx
import React, { useState } from 'react';

interface ThreadFormProps {
  onSubmit: (title: string, author: string) => void;
}

const ThreadForm: React.FC<ThreadFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, author);
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Thread Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Thread</button>
    </form>
  );
};

export default ThreadForm;
