import { useState } from "react";
import { useQuery } from "react-query";
import { PostDetail } from "./PostDetail";
import styles from "./Posts.module.scss";

const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isError, isLoading, error } = useQuery("posts", fetchPosts); //useQuery(key, async function)
  
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
      <ul>
        {data.map(post => (
          <li
            key={post.id}
            className={styles.title}
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className={styles.pages}>
        <button className={styles.btnCount} onClick={() => {}}>
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button className={styles.btnCount} onClick={() => {}}>
          Next
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </div>
  );
}
