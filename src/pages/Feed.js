import { useEffect, useState } from "react";

function Feed() {
  const [user, setUser] = useState(null);
  const [postText, setPostText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  function addPost() {
    if (!postText) return;

    const newPost = {
      text: postText,
      author: anonymous ? "Anonymous Student" : user.name,
      time: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setPostText("");
    setAnonymous(false);
  }

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Please login first</h2>;
  }

  return (
    <div className="feed-page">
      {/* CREATE POST */}
      <div className="card">
        <h3>Create Post</h3>

        <textarea
          placeholder="Post your requirement or doubt..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        <div className="post-actions">
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Post anonymously
          </label>

          <button onClick={addPost}>Post</button>
        </div>
      </div>

      {/* POSTS FEED */}
      <div className="card">
        <h3>Feed</h3>

        {posts.length === 0 && (
          <p className="empty-text">No posts yet</p>
        )}

        {posts.map((p, index) => (
          <div key={index} className="post-item">
            <p className="post-text">{p.text}</p>
            <div className="post-footer">
              <span>{p.author}</span>
              <span>{p.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
