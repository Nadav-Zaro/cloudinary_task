import {  useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import style from "../css/tags.module.css";

export default function TagsComponent({ tag, i ,removeTag,editTag,setEditedTag}) {
  const [isEdited, setIsEdited] = useState(false);

  return (
    !isEdited ?  <li style={{ background: tag.color }}>
        {tag.name}
        <span>
          <FaTrashAlt onClick={() => removeTag(i)} title="Delete Tag" />
          <FaEdit className={style.editTag} onClick={() => setIsEdited(!isEdited)} title="Edit Tag" />
        </span>
      </li>:
      <form
      className={style.editForm}
        onSubmit={(e) => {
          e.preventDefault();
          editTag(i);
          setIsEdited(!isEdited)
        }}
      >
        <input
          type="text"
          onChange={(e) => setEditedTag(e.target.value)}
          placeholder="Edit Tag"
          defaultValue={tag.name}
        />
        <button type="submit">Edit</button>
        <button onClick={()=>setIsEdited(!isEdited)}>Cancel</button>
      </form>
  );
}
