import React, { useContext, useEffect, useState } from "react";
import { PostList } from "./PostList";
import { PostContext } from "./PostProvider";
import { PostDetail } from "./PostDetail"

export const PostSearch = () => {
  const { posts, getPosts, searchPosts, setSearch } = useContext(PostContext);
  const [filteredPosts, setFiltered] = useState([]);

	// const FilterAllPosts = posts.filter(
	// 	(p) => p.title.toLowerCase().includes(searchPosts.toLowerCase())
	// )

	// const FindPosts = () => {
	// 	return (
	// 		<div className="filterposts">
	// 			{FilterAllPosts.map((d) => (
	// 				<post key={posts} id={posts} />
	// 				))}
	// 		</div>
	// 	)
	// }

	// const handleSearch = (e) => {
	// 	let PostTitle = [ ...filteredPosts]
	// 	PostTitle = posts.filter(
	// 		(post) => post.title === e.target.value
	// 	)
	// 	setFiltered(PostTitle)
	// 	FindPosts()
	// }

  useEffect(() => {
    console.log("PostList: useEffect - getPosts");
    getPosts();
  }, []);
  useEffect(() => {
    if (searchPosts !== "") {
      const subset = posts.filter((post) =>
        post.title.toLowerCase().includes(searchPosts.toLowerCase())
      );
      setFiltered(subset);
    } else {
      setFiltered(posts);
    }
  }, [searchPosts, posts]);

  return (
    <section className="post_search">
      Search Posts
      <input value={posts.id}
        type="text"
        className="searchbar"
        onKeyUp={(e) => setSearch(e.target.value)}
        placeholder="Search for a post..."
      />
      <section className="filtered_post">
        {filteredPosts.map((post) => {
          return <PostList key={post.id} id={post.id} />;
        })}
      </section>
    </section>
  );
};
