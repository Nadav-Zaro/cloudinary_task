import {  useState, useContext } from "react";
import { tagsContext } from "../context/TagsContext.js";
import style from "../css/assigned.module.css";
import { FaTrashAlt } from "react-icons/fa";

export default function Assigned() {
  const [search, setSearch] = useState("");
  const { tags, setTags } = useContext(tagsContext);
  const STORAGE_KEY = "userTags"

  function unTagImg(i,j) {
    const temp = [...tags]
    temp[i].imgs.splice(j,1)
    setTags(temp)
    localStorage.setItem(STORAGE_KEY,JSON.stringify(temp))
  }

  const tagsElement = tags
    .filter(value => {
      if (search === "") return value;
      else if (value.name.toLowerCase().includes(search.toLowerCase()))
        return value;
    })
    .map((tag, i) => (
      <div key={i} className={style.tagCard}>
        <p style={{background:tag.color}}>{tag.name}</p>
        {tag.imgs.length
          ? tag.imgs.map((img, j) => (
              <div key={j} className={style.taggedImgs}>
                <img src={img.img} />
                <p>{img.name}</p>
                <span title="Remove"><FaTrashAlt onClick={()=>{
                  unTagImg(i,j)
                }}/></span>
              </div>
            ))
          : "No images yet"}
      </div>
    ));
    
  return (
    <div className={style.assignedHolder}>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Tag"
      />
      <div className={style.assigned}>{tagsElement}</div>
    </div>
  );
}
