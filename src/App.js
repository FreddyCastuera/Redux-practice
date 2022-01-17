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




function App() {
  const dispatch = useDispatch()
  const form = useSelector(state=>state.formReducer)
  const posts = useSelector(state=>state.postsReducer)
  const filter = useSelector(state=>state.filterReducer)
  const state = useSelector(state=>state)


  //----------------------logica de formulario------------------------------------
  //const initialForm = {id:null,author:'',title:'',content:'',important:false,likes:0}
  //const [form,setForm] = useState(initialForm)

  // const handleChange = (event)=>{
  //   const {name,value} = event.target
  //   //setForm({...form,[name]:value})
  //   dispatch({type:'INPUT_CHANGE',name:name,value:value})
  // }
  //-------------------------------------------------------------------------------

  //-------------------------logica de creacion,actualizacion y eliminacion de posts------------
  //const [posts,setPosts] = useState([])


  // const handleAddPost = (e) =>{
  //   e.preventDefault()
  //   //setPosts([...posts,{...form,id:v4()}])
  //   dispatch({type:'ADD_POST',payload:{...form,id:v4()}})
  //   console.log(posts)
  //   //setForm(initialForm)
  //   dispatch({type:'CLEAR_FORM'})
  // }

  // const handleToggleImportance = (event) =>{  
  //   const {id} = event.target
  //   // const updatedPosts = posts.map(post=>{
  //   //   return post.id===id?{...post,important:!post.important}:post
  //   // })
  //   dispatch({type:'TOGGLE_IMPORTANCE',id:id})
  //   // setPosts(updatedPosts)
  // }
  // const handleLike = (event)=>{
  //   const {id} = event.target
  //   dispatch({type:'ADD_LIKE',id:id})
  // }
  // const handleDelete = (event) =>{
  //   const {id} = event.target
  //   // const filteredPost = posts.filter(post=>post.id!==id)
  //   dispatch({type:'DELETE_POST',id:id})
  //   // setPosts(filteredPost)
  // }
  //------------------------------------------------------------------------------------------------

  //---------------logia del filtro por importancia--------------------------------------------------
  //const [filterBy,setFilterBy] = useState('all')

  // const handleFilter = (event) =>{
  //   const {value:type} = event.target 
  //   dispatch({type:type})
  // }
    

  const [filteredPosts,setFilteredPost] = useState(posts)

  useEffect(()=>{
    console.log(state)
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

  //---------------------------------------------------------------------------------------------------

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
