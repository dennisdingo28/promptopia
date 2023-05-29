"use client";
import {useState,useEffect} from "react";

import PromptCard from "./PromptCard";


const PromptCardList = ({data,handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post,index)=>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText,setSearchText] = useState("");
  const [posts,setPosts] = useState([]);
  console.log('posts',posts);
  const [searchResults,setSearchResults] = useState([]);
  console.log("search resulsts",searchResults);

  const handleSearchChange = (e) =>{
    const textValue = e.target.value;
    setSearchText(textValue);
    
    setTimeout(()=>{
      setSearchResults(filterPrompts(textValue));
    },500);
  }

  const filterPrompts = (searchText)=>{
    const regex = new RegExp(searchText,"i");
    return posts.filter(post=>{
      return regex.test(post.creator.username) || regex.test(post.prompt) || regex.test(post.tag);
    })
  };

  const handleTagClick = (tag)=>{
    setSearchText(tag);
    setSearchResults(filterPrompts(tag));
  }

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setSearchResults(data);
    }
    fetchPosts();
  },[]);

  return (
    <section className="feed">
      <form className="relative w-full text-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>
      <PromptCardList data={searchResults} handleTagClick={handleTagClick}/>
    </section>
  )
}

export default Feed
