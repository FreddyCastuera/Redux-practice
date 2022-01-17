import React from 'react'
import styled from 'styled-components'
import Post from './Post';
import { useSelector } from 'react-redux';

const StyledUl = styled.ul`
  display:flex;
  flex-direction:column;
  list-style-type:none;
  margin:0;
  padding:0;
  width:100%
`;

const PostList = () => {
    const posts = useSelector(state=>{
        switch(state.filter){
            case 'all':
                return state.posts
            case 'important':
                return state.posts.filter(post=>post.important===true)
            case 'not important':
                return state.posts.filter(post=>post.important===false)
            default:
                return state.posts
        }
    })
    return (
        <StyledUl>
        {!!posts.length && posts.map(({id,author,title,content,important,likes})=>{
          return <Post key={id}
            id={id}
            author={author}
            title={title}
            content={content}
            important={important}
            likes={likes}
          />
        })}
      </StyledUl>
    )
}
export default PostList