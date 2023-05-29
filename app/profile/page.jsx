"use client"

import {useState,useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation"
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";


const UserProfile = () => {

    const router = useRouter();

    const {data: session} = useSession();

    const [posts,setPosts] = useState([]);
    const [currentUser,setCurrentUser] = useState({});  

    const params = useSearchParams();
    const userId = params.get('id');

    useEffect(()=>{
        const fetchPosts = async () =>{
          const response = await fetch(`/api/users/${userId || session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        }
        const getCurrentUser = async()=>{
          const response = await fetch(`/api/users/${userId || session?.user.id}`);
          const data = await response.json();
          setCurrentUser(data);
        }
          getCurrentUser();
        if(session?.user.id);
            fetchPosts();
      },[]);

    const handleEdit = async (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    };
    const handleDelete = async (post)=>{
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

      if(hasConfirmed){
        try{
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:"DELETE"
          });
          const filteredPosts = posts.filter((p)=>p._id!==post._id);
          setPosts(filteredPosts);
        }catch(err){
          console.log(err);
        }
      }
    }
    if(session?.user.id===userId || currentUser._id===session?.user.id)
    return (
    <Profile name="My" desc="Welcome to your personalized page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
    )

    return(
      <Profile name={currentUser.username} desc={`Welcome to ${currentUser.username} personalized page`} data={posts}/>
    )
}

export default UserProfile
