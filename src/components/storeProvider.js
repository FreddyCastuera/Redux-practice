import React from 'react'
import { createStore,combineReducers } from 'redux'
import {Provider} from 'react-redux'
import {getPosts} from '../services/postsService'

const postsReducer = (state=[],action)=>{
    switch(action.type){
      case 'ADD_POST':
        return [...state,action.payload]
      case 'TOGGLE_IMPORTANCE':
        return state.map(post=>post.id===action.id?{...post,important:!post.important}:post)
      case 'ADD_LIKE':
        return state.map(post=>post.id===action.id?{...post,likes:post.likes+1}:post)
      case 'DELETE_POST':
        return state.filter(post=>post.id!==action.id)
      default:
        return state
    }
  }  
  const filterReducer = (state='all',action) =>{
     switch(action.type){
       case 'SET_FILTER':
         return action.filter
        default:
          return state
     }
  }

  const initialForm = {id:null,author:'',title:'',content:'',important:false,likes:0}
  const formReducer = (state=initialForm,action) =>{
    switch(action.type){
      case 'INPUT_CHANGE':
        return {...state,[action.name]:action.value}
      case 'CLEAN_FORM':
        return initialForm
      default:
        return state
    }
  }
  const reducers = combineReducers({
    posts:postsReducer,
    filter:filterReducer,
    form:formReducer
  })
  const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  getPosts().then(posts =>{
    posts.forEach(post=>{
      store.dispatch({type:'ADD_POST',payload:post})
    })
  })
  

const StoreProvider = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default StoreProvider
