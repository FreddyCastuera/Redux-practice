import React from 'react'
import { useSelector,useDispatch } from 'react-redux';


const RadioList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state=>state.filter)

    const handleFilter = (event) =>{
        const {value} = event.target 
        dispatch({type:'SET_FILTER',filter:value})
      }
    return (
        <section style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'1rem'}}>
        <span>filter by: </span>
        <div>
          <label htmlFor="all">all</label>
          <input id='all' type="radio" value='all' name='filter' onChange={handleFilter} checked={filter==='all'}/>
        </div>
        <div>
          <label htmlFor="important">important</label>
          <input id='important' type="radio" value='important' name='filter' onChange={handleFilter} checked={filter==='important'}/>
        </div>
        <div>
          <label htmlFor="not important">not important</label>
          <input id='not important' type="radio" value='not important' name='filter' onChange={handleFilter} checked={filter==='not important'}/>
        </div>
      </section>
    )
}
export default RadioList