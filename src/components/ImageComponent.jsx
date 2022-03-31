import { useState, useContext } from "react";
import { tagsContext } from "../context/TagsContext.js";
import style from "../css/unassigned.module.css";
import { FaTag } from "react-icons/fa";

export default function ImageComponent({ img }) {
  const [isTaged, setIsTaged] = useState(false);
  const { tags, setTags } = useContext(tagsContext);
  const STORAGE_KEY = "userTags";

  const tagStyle = { display: isTaged ? "block" : "none" };

  const temp = [...tags];
  function tagImage(j) {
    temp[j].imgs.push({ img: img.download_url, name: img.author });
    setTags(temp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(temp));
  }

  const tagsElement = tags.map((tag, j) => (
    <li
      key={j}
      style={{ border: `1.5px solid ${tag.color}` }}
      onClick={() => {
        tagImage(j);
      }}
    >
      {tag.name}
    </li>
  ));

  return (
    <>
      <img src={img.download_url} />
      <p>
        {img.author}
        <span title="Tag Image">
          <FaTag
            onClick={() => {
              setIsTaged(!isTaged);
            }}
          />
        </span>
      </p>
      <ul className={style.cardTag} style={tagStyle}>
        {tagsElement}
      </ul>
    </>
  );
}
