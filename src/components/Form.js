import React from 'react'
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

    const handleChange = async (event)=>{
        const {name,value} = event.target
        dispatch({type:'INPUT_CHANGE',name:name,value:value})
    }
    const handleAddPost = async (e) =>{
        e.preventDefault()
        const payload = {...form,id:v4()}
        dispatch({type:'ADD_POST',payload:payload})
        createPost(payload)
        dispatch({type:'CLEAN_FORM'})
    }

    return (
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
      <input type="submit" value="enviar" style={{marginTop:'1rem'}}/>
    </StyledForm>
    )
}
export default Form