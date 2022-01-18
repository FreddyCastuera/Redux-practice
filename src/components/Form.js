import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { v4 }  from 'uuid';
import styled from "styled-components";
import Input from "./Input";
import { createPost } from '../services/postsService';

const StyledForm = styled.form`
  display:flex;
  flex-direction:column;
  width:100%;
  margin-bottom:1rem;
`;

const Form = () => {
    const dispatch = useDispatch()
    const form = useSelector(state=>state.form)
    const [message,setMessage] = useState('')

    const handleChange = async (event)=>{
        const {name,value} = event.target
        dispatch({type:'INPUT_CHANGE',name:name,value:value})
    }
    const handleAddPost = async (e) =>{
        e.preventDefault()
        const payload = {...form,id:v4()}
        const createdPost = await createPost(payload)
        if(!!createPost){
          setMessage('post created succesfully')
          setTimeout(()=>{
            setMessage('')
          },3000)
        }
        console.log(createdPost)
        dispatch({type:'ADD_POST',payload:payload})
        dispatch({type:'CLEAN_FORM'})
        
    }

    return (
      <>
    <StyledForm onSubmit={handleAddPost}>
      <Input 
        type="text"
        title="author"
        name="author"
        form={form}
        handleChange={handleChange}
      /> 
      <Input 
        type="text"
        title="title"
        name="title"
        form={form}
        handleChange={handleChange}
      />
      <Input 
        type="text"
        title="content"
        name="content"
        form={form}
        handleChange={handleChange}
      />       
      {!message && <input type="submit" value="enviar" style={{marginTop:'1rem'}}/>}
      {!!message && <div style={{border:'1px solid green',backgroundColor:'greenyellow',color:'black',borderRadius:'5px',padding:'1rem 2rem',margin:'1rem'}}>Post creado exitosamente</div>}
    </StyledForm>
    
    </>
    )
}
export default Form