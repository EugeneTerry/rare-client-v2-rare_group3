import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/CategoryList"
import { CategoryCreate } from "./categories/CategoryCreate"
import { CategoryForm } from "./categories/CategoryForm"
import { CommentProvider } from "./comments/CommentProvider"
import { CommentList } from "./comments/CommentList"
import { PostList } from "./posts/PostList"
import { PostDetail } from './posts/PostDetail'
import { PostForm } from "./posts/PostForm"
import { PostProvider } from "./posts/PostProvider.js"
import { TagList } from "./tags/TagList"
import { TagForm } from "./tags/TagForm"
import { TagDetail } from "./tags/TagDetail"
import { MyPosts } from './posts/MyPosts'
import { TagProvider } from "./tags/TagProvider"
import { CategoryProvider } from "./categories/CategoryProvider"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <CategoryProvider>
            <Route exact path='/categories'>
                <CategoryList />
            </Route>

            <Route path='/categories/create'>
                <CategoryCreate />
            </Route>

            <Route path='/categories/edit/:categoryId(\d+)'>
                <CategoryForm />
            </Route>

        <PostProvider>
        <CommentProvider>
            <Route exact path='/'>
                <PostList />
            </Route>

            <Route exact path='/posts/create'>
                <PostForm />
            </Route>

            <Route path='/posts/edit/:postId(\d+)'>
                <PostForm />
            </Route>

            <Route exact path='/posts'>
                <PostList />
                <CommentList />
            </Route>

            <Route path='/posts/:postId(\d+)'>
                <PostDetail />
            </Route>

            <Route path='/myposts'>
                <MyPosts />
            </Route>
            </CommentProvider>
            </PostProvider>
            <TagProvider>
                <Route exact path='/tags'>
                    <TagList />
                </Route>
                <Route path='/tags/create'>
                    <TagForm />
                </Route>
                <Route path='/tags/edit/:tagId(\d+)'>
                    <TagForm />
                </Route>
            </TagProvider>
            </CategoryProvider>
        </main>
    </>
}
