import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditPlace() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/places/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`/api/places/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      window.location.href = '/';
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={formData.name} 
      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      <input type="text" value={formData.location} 
      onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
      <input type="text" value={formData.image} 
      onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
      <input type="text" value={formData.mapURL} 
      onChange={(e) => setFormData({ ...formData, mapURL: e.target.value })} required />
      <textarea value={formData.description} 
      onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
      <button type="submit">Update Place</button>
    </form>
  );
}
