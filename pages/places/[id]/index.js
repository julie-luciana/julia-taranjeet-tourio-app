import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PlaceDetail() {
  const [place, setPlace] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/places/${id}`)
        .then(res => res.json())
        .then(data => setPlace(data));
    }
  }, [id]);

  async function handleDelete() {
    const response = await fetch(`/api/places/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.href = '/'; 
    }
  }

  return (
    <div>
      <h1>{place.name}</h1>
      <p>{place.description}</p>
      <button onClick={handleDelete}>Delete Place</button>
      <a href={`/places/${id}/edit`}>Edit Place</a>
    </div>
  );
}
