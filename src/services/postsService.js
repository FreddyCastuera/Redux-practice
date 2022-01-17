import axios from 'axios'
const baseURL = 'http://localhost:3001/posts'
export const getPosts = async () =>{
    try{
        const posts = await axios.get(baseURL)
        return posts.data
    }catch(err){
        console.log(err)
    }
}
export const getPost = async (id) => {
    try{
        const post = await axios.get(`${baseURL}/${id}`)
        return post.data
    }catch(err){
        console.log(err)
    }
}
export const createPost = async (post) =>{
    try{
        const newPost = await axios.post(baseURL,post)
        return newPost.data
    }catch(err){
        console.log(err)
    }
}
export const updatePost = async (id,post) =>{
    try{
        const updatedPost = await axios.patch(`${baseURL}/${id}`,post)
        return updatedPost.data
    }catch(err){
        console.log(err)
    }
}
export const deletePost = async (id) =>{
    try{
        const deletedPost = await axios.delete(`${baseURL}/${id}`)
        return deletedPost
    }catch(err){
        console.log(err)
    }
}