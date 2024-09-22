import { useState } from "react";
import {
  FormContainer,
  Input,
  Textarea,
  Label,
} from "../components/Styled Form";
import { StyledButton } from "../components/StyledButton";

export default function CreatePlace() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: "",
    mapURL: "",
    description: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      window.location.href = "/";
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <Label htmlFor="image">Image URL</Label>
      <Input
        id="image"
        type="text"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        required
      />

      <Label htmlFor="mapURL">Map URL</Label>
      <Input
        id="mapURL"
        type="text"
        placeholder="Map URL"
        value={formData.mapURL}
        onChange={(e) => setFormData({ ...formData, mapURL: e.target.value })}
        required
      />

      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
        rows="10"
      />

      <StyledButton type="submit">Add Place</StyledButton>
    </FormContainer>
  );
}
