import { useState, useContext } from "react";
import { tagsContext } from "../context/TagsContext.js";
import style from "../css/unassigned.module.css";
import { FaTag } from "react-icons/fa";
import { useDrag } from "react-dnd";

export default function ImageComponent({ img }) {
  const [isTagged, setIsTaged] = useState(false);
  const [tagIndex, setTagIndex] = useState(0);
  const [{isDragging} , drag ] = useDrag(()=>({
    type:"image",
    item: {img:img.download_url,name:img.author},
    collect:(monitor)=>({
      isDragging:!!monitor.isDragging()
    }),

  }))
  const { tags, setTags } = useContext(tagsContext);
  const STORAGE_KEY = "userTags";

  const tagStyle = { display: isTagged ? "block" : "none" };

  
  function tagImage(j) {
    const temp = [...tags];
    temp[j].imgs.push({ img: img.download_url, name: img.author });
    setTags(temp);
  }

  const tagsElement = tags.map((tag, j) => (
    <li
      key={j}
      style={{border: `1.5px solid ${tag.color}` }}
      onClick={() => {
        setTagIndex(j)
      }}
    >
      {tag.name}
    </li>
  ));

  return (
    <>
      <img src={img.download_url} ref={drag} style={{border:isDragging? "3px solid blue" : ""}}/>
      <p>
        {img.author}
        <span title="Tag Image">
          <FaTag
            onClick={() => {
              setIsTaged(!isTagged);
            }}
          />
        </span>
      </p>
      <ul className={style.cardTag} style={tagStyle}>
        {tagsElement}
        <button onClick={()=>tagImage(tagIndex)}>Apply</button>
      </ul>
    </>
  );
}
