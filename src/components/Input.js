import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
  padding:0.5rem;
  border-radius:10px;
  margin:0.5rem 0;
  :hover{
    background-color:green;
    color:white;
  }
  :focus{
    border:2px solid yellow;
  }
`;


const Input = ({type,title,name,form,handleChange}) => {
    return (
    <>
        <label htmlFor={name}>{title}</label>
        <StyledInput
            id={name} 
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
        />
    </>
    )
}
export default Input
