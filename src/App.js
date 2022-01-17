import './App.css';
import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux';
import RadioList from './components/RadioList';
import PostList from './components/PostList';
import Form from './components/Form';


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
  const posts = useSelector(state=>state.postsReducer)
  const filter = useSelector(state=>state.filterReducer)

  const [filteredPosts,setFilteredPost] = useState(posts)

  useEffect(()=>{
    switch(filter){
      case 'all':
        setFilteredPost(posts)
        break;
      case 'important':
        const importantPosts = posts.filter(post=>post.important===true)
        setFilteredPost(importantPosts)
        break;
      case 'not important':
        const notImportantPosts = posts.filter(post=>post.important===false)
        setFilteredPost(notImportantPosts)
        break;
      default:
        setFilteredPost(posts)
    }
  },[filter,posts])


  return (
    <StyledSection>
    <Form />
    <RadioList />
    <PostList 
      filteredPosts={filteredPosts} />
    </StyledSection>
  );
}

export default App;
