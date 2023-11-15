import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserThumbnails from '@wasp/queries/getUserThumbnails';

export function Dashboard() {
  const { data: thumbnails, isLoading, error } = useQuery(getUserThumbnails);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {thumbnails.map((thumbnail) => (
        <div
          key={thumbnail.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>
            <img src={thumbnail.image} alt={thumbnail.title} className='w-16 h-16 mr-4' />
          </div>
          <div>
            <div>{thumbnail.title}</div>
            <div>{thumbnail.level}</div>
          </div>
          <div>
            <Link
              to={`/thumbnail/${thumbnail.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}