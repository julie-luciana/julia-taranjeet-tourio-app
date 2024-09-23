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

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  text-align: left;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 0.8rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const FormInput = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #333;

  &:focus {
    border-color: #0073e6;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 115, 230, 0.5);
  }
`;

const FormTextarea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #333;
  min-height: 100px;

  &:focus {
    border-color: #0073e6;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 115, 230, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0073e6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px rgba(0, 115, 230, 0.5);
  }
`;

const CommentDeleteButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 1rem;

  &:hover {
    background-color: #ff4c4c;
  }
`;

// Main Component
export default function PlaceDetail() {
  const [place, setPlace] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/places/${id}`)
        .then((res) => res.json())
        .then((data) => setPlace(data));

      // Fetch comments
      fetch(`/api/places/comments?placeId=${id}`)
        .then((res) => res.json())
        .then((data) => setComments(data));
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

  async function handleCommentSubmit(e) {
    e.preventDefault();

    const response = await fetch(`/api/places/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newComment, placeId: id }),
    });

    if (response.ok) {
      const addedComment = await response.json();
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment({ name: "", comment: "" });
    }
  }

  async function handleCommentDelete(commentId) {
    const response = await fetch(`/api/places/comments?id=${commentId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
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

      <section>
        <h3>Comments</h3>
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment._id}>
              <div>
                <strong>{comment.name}</strong>
                <CommentDeleteButton
                  onClick={() => handleCommentDelete(comment._id)}
                >
                  Delete
                </CommentDeleteButton>
              </div>
              <p>{comment.comment}</p>
            </CommentItem>
          ))}
        </CommentList>

        <CommentForm onSubmit={handleCommentSubmit}>
          <FormInput
            type="text"
            placeholder="Your name"
            value={newComment.name}
            onChange={(e) =>
              setNewComment({ ...newComment, name: e.target.value })
            }
            required
          />
          <FormTextarea
            placeholder="Your comment"
            value={newComment.comment}
            onChange={(e) =>
              setNewComment({ ...newComment, comment: e.target.value })
            }
            required
          />
          <SubmitButton type="submit">Submit Comment</SubmitButton>
        </CommentForm>
      </section>
    </div>
  );
}
