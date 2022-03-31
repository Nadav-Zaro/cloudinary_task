import { useState, useContext } from "react";
import { tagsContext } from "../context/TagsContext.js";
import style from "../css/tags.module.css";
import TagsComponent from "./TagsComponent.jsx";

export default function Tags() {
  const [newTag, setNewTag] = useState("");
  const [editedTag, setEditedTag] = useState("");
  const { tags, setTags } = useContext(tagsContext);
  const colors = ['aqua','blue','aquamarine','crimson','cyan','orange','gold','purple','darksalmon']
  const STORAGE_KEY = "userTags"

  function addTag() {
    const temp = [...tags];
    const tempTag = { name: newTag, imgs: [] ,color:colors.sort(()=>Math.random()-.5)[0]};
    temp.push(tempTag);
    setTags(temp);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(temp))
  }

  function removeTag(i) {
    const temp = [...tags];
    temp.splice(i, 1);
    setTags(temp);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(temp))
  }

  function editTag(i) {
    const temp = [...tags];
    temp[i].name = editedTag
    setTags(temp);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(temp))
  }

  const tagsElement = tags.map((tag, i) => (
        <ul key={i} className={style.tagList}>
          <TagsComponent tag={tag} i={i} editTag={editTag} removeTag={removeTag} setEditedTag={setEditedTag}/>
        </ul>
      ));

  return (
    <div className={style.tags}>
      <p>Add tag</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTag();
        }}
      >
        <input
          type="text"
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New Tag"
        />
        <button type="submit">Add tag</button>
      </form>
      <div className={style.tagsHolder}>
       <p>Available tags</p>
      {tagsElement} 
      </div>
      
    </div>
  );
}
