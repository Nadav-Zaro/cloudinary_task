import { useState, useContext } from "react";
import { tagsContext } from "../context/TagsContext.js";
import style from "../css/tags.module.css";
import TagsComponent from "./TagsList.jsx";
import randomColor from "randomcolor";

export default function Tags() {
  const [newTag, setNewTag] = useState("");
  const [editedTag, setEditedTag] = useState("");
  const { tags, setTags } = useContext(tagsContext);
  const colors = randomColor()
  const STORAGE_KEY = "userTags"

  function addTag() {
    const temp = [...tags];
    const tempTag = { name: newTag, imgs: [] ,color:colors};
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
    if (editedTag === "") {
      alert("You must enter tag name")
      setTags(temp)
    }
    else{
      temp[i].name = editedTag
      setTags(temp);
    }
  }

  const tagsElement = tags.map((tag, i) => (
        <ul key={i} className={style.tagList}>
          <TagsComponent tag={tag} i={i} editTag={editTag} removeTag={removeTag} setEditedTag={setEditedTag}/>
        </ul>
      ));

  return (
    <div className={style.tags}>
      <p>Your tags</p>
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
