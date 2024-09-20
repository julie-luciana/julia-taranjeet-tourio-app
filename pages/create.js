import { useState } from 'react';

export default function CreatePlace() {
  const [formData, setFormData] = useState({ name: '', location: '', image: '', mapURL: '', description: '' });

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('/api/places', {
      method: 'POST',
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
      <input type="text" placeholder="Name" value={formData.name} 
      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      <input type="text" placeholder="Location" value={formData.location} 
      onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
      <input type="text" placeholder="Image URL" value={formData.image} 
      onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
      <input type="text" placeholder="Map URL" value={formData.mapURL} 
      onChange={(e) => setFormData({ ...formData, mapURL: e.target.value })} required />
      <textarea placeholder="Description" value={formData.description} 
      onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
      <button type="submit">Add Place</button>
    </form>
  );
}
