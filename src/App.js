import './App.css';
import {useState,useEffect} from 'react'
import { v4 }  from 'uuid';
import styled from 'styled-components'
import { createStore } from 'redux';

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
  const initialPost = {id:null,author:'',title:'',content:'',important:false}
  const [form,setForm] = useState(initialPost)

  const [posts,setPosts] = useState([])

  const [filterBy,setFilterBy] = useState('all')

  const handleAddPost = (e) =>{
    e.preventDefault()
    setPosts([...posts,{...form,id:v4()}])
    setForm(initialPost)
  }
  const handleChange = (event)=>{
    const {name,value} = event.target
    setForm({...form,[name]:value})
  }
  const handleToggleImportance = (event) =>{  
    const {id} = event.target
    const updatedPosts = posts.map(post=>{
      return post.id===id?{...post,important:!post.important}:post
    })
    setPosts(updatedPosts)
  }
  const handleDelete = (event) =>{
    const {id} = event.target
    const filteredPost = posts.filter(post=>post.id!==id)
    setPosts(filteredPost)
  }
  const handleFilter = (event) =>{
    const {value} = event.target 
    setFilterBy(value)
  }
  
  const [filteredPosts,setFilteredPost] = useState(posts)
  useEffect(()=>{
    switch(filterBy){
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
  },[filterBy,posts])
 


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
          <input id='all' type="radio" value='all' name='all'  onChange={handleFilter} checked={filterBy==='all'}/>
        </div>
        <div>
          <label htmlFor="important">important</label>
          <input id='important' type="radio" value='important' name='important' onChange={handleFilter} checked={filterBy==='important'}/>
        </div>
        <div>
          <label htmlFor="not important">not important</label>
          <input id='no important' type="radio" value='not important' name='not important' onChange={handleFilter} checked={filterBy==='not important'}/>
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