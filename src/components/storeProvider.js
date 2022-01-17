import React from 'react'
import { createStore,combineReducers } from 'redux'
import {Provider} from 'react-redux'

const postsReducer = (state=[],action)=>{
    switch(action.type){
      case 'ADD_POST':
        return [...state,action.payload]
      case 'TOGGLE_IMPORTANCE':
        return state.map(post=>post.id===action.id?{...post,important:!post.important}:post)
      case 'DELETE_POST':
        return state.filter(post=>post.id!==action.id)
      default:
        return state
    }
  }  
  const filterReducer = (state='all',action) =>{
     switch(action.type){
       case 'ALL':
         return 'all'
        case 'IMPORTANT':
          return 'important'
        case 'NOT_IMPORTANT':
          return 'not important'
        default:
          return state
     }
  }
  
  const reducers = combineReducers({
    postsReducer,
    filterReducer
  })
  const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const StoreProvider = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default StoreProvider
