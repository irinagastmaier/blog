import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import styles from "./Posts.module.scss";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const [showForm, setShowForm] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const { data, isLoading, error, isError } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  ); //passing array for the query key and treat as a dependency array --> when key changes, create a new query

  const deleteMutation = useMutation(postId => deletePost(postId));
  const updateMutation = useMutation(postId => updatePost(postId));

  if (isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  const updatePost = async (e, postId) => {
    e.preventDefault();
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      { method: "PATCH", data: { title: updatedTitle } }
    );
    return response.json();
  };

  const grabValue = e => {
    setUpdatedTitle({ ...updatedTitle, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h3 style={{ color: "#1d8dbe", paddingBottom: "0.5rem" }}>
        {post.title}
      </h3>
      <div>
        <button
          className={styles.btn}
          onClick={() => deleteMutation.mutate(post.id)}
        >
          Delete
        </button>
        {deleteMutation.isError && <p style={{ color: "red" }}>Error</p>}
        {deleteMutation.isLoading && (
          <p style={{ color: "purple" }}>Deleting</p>
        )}
        {deleteMutation.isSuccess && <p style={{ color: "green" }}>Deleted</p>}
        <button className={styles.btn} onClick={() => setShowForm(!showForm)}>
          Update title
        </button>
        {showForm && (
          <>
            <form onSubmit={() => updateMutation.mutate(post.id)}>
              <input
                type='text'
                name='title'
                id='title'
                onChange={grabValue}
                className={styles.pd}
                placeholder='type title'
              />
              <button type='submit' className={styles.btn}>
                Submit
              </button>
            </form>
          </>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map(comment => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </div>
  );
}
