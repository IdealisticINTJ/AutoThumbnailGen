import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createThumbnail from '@wasp/actions/createThumbnail';

export function CreateThumbnail() {
  const createThumbnailFn = useAction(createThumbnail);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createThumbnailFn({ title, level, image });
    setTitle('');
    setLevel('');
    setImage('');
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          className='px-1 py-2 border rounded text-lg'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Level'
          className='px-1 py-2 border rounded text-lg'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          type='text'
          placeholder='Image'
          className='px-1 py-2 border rounded text-lg'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Create Thumbnail
        </button>
      </form>
      <Link to='/dashboard' className='text-blue-500 hover:underline'>Back to Dashboard</Link>
    </div>
  );
}