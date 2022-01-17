import React from 'react'
import styled from 'styled-components'
import Post from './Post';

const StyledUl = styled.ul`
  display:flex;
  flex-direction:column;
  list-style-type:none;
  margin:0;
  padding:0;
  width:100%
`;

const PostList = ({filteredPosts,handleToggleImportance,handleLike,handleDelete}) => {
    return (
        <StyledUl>
        {!!filteredPosts.length && filteredPosts.map(({id,author,title,content,important,likes})=>{
          return <Post 
            id={id}
            author={author}
            title={title}
            content={content}
            important={important}
            handleToggleImportance={handleToggleImportance}
            likes={likes}
            handleLike={handleLike}
            handleDelete={handleDelete}

          />
        })}
      </StyledUl>
    )
}
export default PostList