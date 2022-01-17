import './App.css';
import {useState,useEffect} from 'react'
import { v4 }  from 'uuid';
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux';
const StyledForm = styled.form`
  display:flex;
  flex-direction:column;
  width:100%;
  margin-bottom:1rem;
`;
const StyledUl = styled.ul`
  display:flex;
  flex-direction:column;
  list-style-type:none;
  margin:0;
  padding:0;
  width:100%
`;
const StyledSection = styled.section`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:80%;
  max-width:500px;
  margin:2rem auto;
`;
const StyledButton = styled.button`
  padding:0.5rem 1rem;
  border-radius:20px;
  background-color: ${props=>props.primary?"green":props.secondary?"aqua":props.danger?"red":"transparent"};
  color:${props=>props.secondary?'black':'white'}
`;



function App() {
  const dispatch = useDispatch()
  const posts = useSelector(state=>state.postsReducer)
  const filter = useSelector(state=>state.filterReducer)


  //----------------------logica de formulario------------------------------------
  const initialForm = {id:null,author:'',title:'',content:'',important:false}
  const [form,setForm] = useState(initialForm)

  const handleChange = (event)=>{
    const {name,value} = event.target
    setForm({...form,[name]:value})
  }
  //-------------------------------------------------------------------------------

  //-------------------------logica de creacion,actualizacion y eliminacion de posts------------
  //const [posts,setPosts] = useState([])


  const handleAddPost = (e) =>{
    e.preventDefault()
    //setPosts([...posts,{...form,id:v4()}])
    dispatch({type:'ADD_POST',payload:{...form,id:v4()}})
    console.log(posts)
    setForm(initialForm)
  }

  const handleToggleImportance = (event) =>{  
    const {id} = event.target
    // const updatedPosts = posts.map(post=>{
    //   return post.id===id?{...post,important:!post.important}:post
    // })
    dispatch({type:'TOGGLE_IMPORTANCE',id:id})
    // setPosts(updatedPosts)
  }
  const handleDelete = (event) =>{
    const {id} = event.target
    // const filteredPost = posts.filter(post=>post.id!==id)
    dispatch({type:'DELETE_POST',id:id})
    // setPosts(filteredPost)
  }
  //------------------------------------------------------------------------------------------------

  //---------------logia del filtro por importancia--------------------------------------------------
  //const [filterBy,setFilterBy] = useState('all')

  const handleFilter = (event) =>{
    const {value:type} = event.target 
    dispatch({type:type})
  }
    

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

  //---------------------------------------------------------------------------------------------------


  return (
    <StyledSection>
    <StyledForm onSubmit={handleAddPost}>
      <label htmlFor="author">author</label>
      <input
        id="author"  
        type='text'
        name='author'
        value={form.author}
        onChange={handleChange}
      />
      <label htmlFor="title">title</label>
      <input  
        id='title'
        type='text'
        name='title'
        value={form.title}
        onChange={handleChange}
      />
      <label htmlFor="content">content</label>
      <input  
        id='content'
        type='text'
        name='content'
        value={form.content}
        onChange={handleChange}
      />
      <input type="submit" value="enviar" style={{marginTop:'1rem'}}/>
    </StyledForm>
    <section style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'1rem'}}>
        <span>filter by: </span>
        <div>
          <label htmlFor="all">all</label>
          <input id='all' type="radio" value='ALL' name='filter' onChange={handleFilter} checked={filter==='all'}/>
        </div>
        <div>
          <label htmlFor="important">important</label>
          <input id='important' type="radio" value='IMPORTANT' name='filter' onChange={handleFilter} checked={filter==='important'}/>
        </div>
        <div>
          <label htmlFor="not important">not important</label>
          <input id='not important' type="radio" value='NOT_IMPORTANT' name='filter' onChange={handleFilter} checked={filter==='not important'}/>
        </div>
      </section>
    <StyledUl>
      {!!filteredPosts.length && filteredPosts.map(({id,author,title,content,important})=>{
        return <li key={id} > 
          <section style={{border:"2px solid black",borderRadius:'1rem',padding:"1rem",margin:'1rem 0'}}>
            <h2>{title}</h2>
            <p>{content}</p>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <StyledButton primary={important} secondary={!important} id={id} onClick={handleToggleImportance}>{important?'important':'not important'}</StyledButton>
              <StyledButton danger id={id} onClick={handleDelete}>eliminar</StyledButton>
            </div>
            <span style={{display:'block'}}>author: {author}</span>
          </section>
        </li>
      })}

    </StyledUl>
    </StyledSection>
  );
}

export default App;
