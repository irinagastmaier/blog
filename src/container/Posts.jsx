import { useState } from "react";
import { useQuery } from "react-query";
import { PostDetail } from "./PostDetail";
import styles from "./Posts.module.scss";

const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1); //for this API the current page starts at 1
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isError, isLoading, error } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  ); //useQuery(key, async function, options)

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
        <button
          className={styles.btnCount}
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage(previousValue => previousValue - 1);
          }}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className={styles.btnCount}
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage(previousValue => previousValue + 1);
          }}
        >
          Next
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </div>
  );
}
