import React from "react";
import { Route, Router } from "react-router-dom";
import { CategoryList } from "./categories/CategoryList";
import { CategoryCreate } from "./categories/CategoryCreate";
import { CategoryForm } from "./categories/CategoryForm";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentList } from "./comments/CommentList";
import { PostList } from "./posts/PostList";
import { PostDetail } from "./posts/PostDetail";
import { PostForm } from "./posts/PostForm";
import { PostProvider } from "./posts/PostProvider.js";
import { TagList } from "./tags/TagList";
import { TagForm } from "./tags/TagForm";
import { MyPosts } from "./posts/MyPosts";
import { TagProvider } from "./tags/TagProvider";
import { RareUserList } from "./rareusers/RareUserList";
import { RareUserProvider } from "./rareusers/RareuserProvider";
import { ReactionProvider } from "./reactions/ReactionProvider";
import { MyReactions } from "./reactions/PostReaction";
import { PostReactions } from "./reactions/PostReaction";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <Route exact path="/categories">
          <CategoryList />
        </Route>

        <Route path="/categories/create">
          <CategoryCreate />
        </Route>

        <Route path="/categories/edit/:categoryId(\d+)">
          <CategoryForm />
        </Route>

        <RareUserProvider>
          <PostProvider>
            <CommentProvider>
              <ReactionProvider>
                <Route exact path="/">
                  <PostList />
                </Route>


            <Route path='/posts/:postId(\d+)'>
                <PostDetail />
                <MyReactions />
            </Route>

                <Route exact path="/posts/create">
                  <PostForm />
                </Route>


                <Route path="/posts/edit/:postId(\d+)">
                  <PostForm />
                </Route>

                <Route exact path="/posts">
                  <PostList />
                  <CommentList />
                </Route>

                <Route path="/myposts">
                  <MyPosts />
                </Route>

                <Route exact path="/profile">
                  <RareUserList />
                </Route>

                <Route path="/reactions">
                  <MyReactions />
                </Route>
              </ReactionProvider>
            </CommentProvider>
          </PostProvider>
        </RareUserProvider>
        <TagProvider>
          <Route exact path="/tags">
            <TagList />
          </Route>
          <Route path="/tags/create">
            <TagForm />
          </Route>
          <Route path="/tags/edit/:tagId(\d+)">
            <TagForm />
          </Route>
        </TagProvider>
      </main>
    </>
  );
};
