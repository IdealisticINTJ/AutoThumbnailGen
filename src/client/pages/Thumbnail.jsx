import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getThumbnail from '@wasp/queries/getThumbnail';
import updateThumbnail from '@wasp/actions/updateThumbnail';
import deleteThumbnail from '@wasp/actions/deleteThumbnail';

export function Thumbnail() {
  const { thumbnailId } = useParams();
  const { data: thumbnail, isLoading, error } = useQuery(getThumbnail, { id: thumbnailId });
  const updateThumbnailFn = useAction(updateThumbnail);
  const deleteThumbnailFn = useAction(deleteThumbnail);

  const [title, setTitle] = useState(thumbnail?.title || '');
  const [level, setLevel] = useState(thumbnail?.level || '');
  const [image, setImage] = useState(thumbnail?.image || '');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateThumbnail = () => {
    updateThumbnailFn({ id: thumbnailId, title, level, image });
  };

  const handleDeleteThumbnail = () => {
    deleteThumbnailFn({ thumbnailId });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Title'
          className='px-1 py-2 border rounded text-lg'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Level'
          className='px-1 py-2 border rounded text-lg'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Image URL'
          className='px-1 py-2 border rounded text-lg'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdateThumbnail}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Update Thumbnail
      </button>
      <button
        onClick={handleDeleteThumbnail}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
      >
        Delete Thumbnail
      </button>
      <Link
        to={`/dashboard`}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
      >
        Back to Dashboard
      </Link>
    </div>
  );
}