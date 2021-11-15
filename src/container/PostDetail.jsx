import { useQuery } from "react-query";
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

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, error, isError } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  ); //passing array for the query key and treat as a dependency array --> when key changes, create a new query

  if (isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <div className={styles.container}>
      <h3 style={{ color: "#1d8dbe", paddingBottom: "0.5rem" }}>
        {post.title}
      </h3>
      <div>
        <button className={styles.btn}>Delete</button>
        <button className={styles.btn}>Update title</button>
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
