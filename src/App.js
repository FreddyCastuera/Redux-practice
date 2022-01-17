import './App.css';
import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux';
import RadioList from './components/RadioList';
import PostList from './components/PostList';
import Form from './components/Form';
import { getPosts,createPost } from './services/postsService';


const StyledSection = styled.section`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:80%;
  max-width:500px;
  margin:2rem auto;
`;

/*movimos toda la logia de estado a sus respectivos reducers y logramos mantener el componente app lo mas
  pequeno posible, salvo la logica del filtro que aun no se como hacerla con un reducer */

function App() {


  return (
    <StyledSection>
    <Form />
    <RadioList />
    <PostList />
    </StyledSection>
  );
}

export default App;
