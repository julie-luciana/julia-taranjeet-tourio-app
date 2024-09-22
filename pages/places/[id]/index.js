import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Article = styled.article`
  border: 2px solid black;
  border-radius: 0.9rem;
  padding: 1rem;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;

  &:hover {
    background-color: #ff4c4c;
  }
`;

const EditLink = styled.a`
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #0073e6;
  }
`;

export default function PlaceDetail() {
  const [place, setPlace] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/places/${id}`)
        .then((res) => res.json())
        .then((data) => setPlace(data));
    }
  }, [id]);

  async function handleDelete() {
    const response = await fetch(`/api/places/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.href = "/";
    }
  }

  return (
    <div>
      <Article>
        <Heading>{place.name}</Heading>
        <Description>{place.description}</Description>

        <ButtonGroup>
          <DeleteButton onClick={handleDelete}>Delete Place</DeleteButton>
          <EditLink href={`/places/${id}/edit`}>Edit Place</EditLink>
        </ButtonGroup>
      </Article>
    </div>
  );
}
