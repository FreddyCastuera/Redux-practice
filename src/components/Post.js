import React from 'react'
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux';
import { deletePost,getPost,updatePost } from '../services/postsService';


const StyledButton = styled.button`
  padding:0.5rem 1rem;
  border-radius:20px;
  background-color: ${props=>props.primary?"green":props.secondary?"aqua":props.danger?"red":"orange"};
  color:${props=>props.secondary?'black':'white'}
`;


const Post = ({id,author,title,content,important,likes}) => {
    const dispatch= useDispatch()
    const handleToggleImportance = async (event) =>{  
        const {id} = event.target
        dispatch({type:'TOGGLE_IMPORTANCE',id:id})
        const postToUpdate = await getPost(id)
        await updatePost(id,{...postToUpdate,important:!postToUpdate.important})
      }
      const handleLike = async (event)=>{
        const {id} = event.target
        dispatch({type:'ADD_LIKE',id:id})
        const postToUpdate = await getPost(id)
        await updatePost(id,{...postToUpdate,likes:postToUpdate.likes+1})
      }
      const handleDelete = async (event) =>{
        const {id} = event.target
        dispatch({type:'DELETE_POST',id:id})
        await deletePost(id)
      }
    

    return (
        <li> 
            <section style={{border:"2px solid black",borderRadius:'1rem',padding:"1rem",margin:'1rem 0'}}>
              <h2>{title}</h2>
              <p>{content}</p>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <StyledButton primary={important} secondary={!important} id={id} onClick={handleToggleImportance}>{important?'important':'not important'}</StyledButton>
                <StyledButton  id={id} onClick={handleLike}>{likes}</StyledButton>
                <StyledButton danger id={id} onClick={handleDelete}>eliminar</StyledButton>
              </div>
              <span style={{display:'block'}}>author: {author}</span>
            </section>
          </li>
    )
}

export default Post
