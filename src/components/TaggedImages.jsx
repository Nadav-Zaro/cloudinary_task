import React from "react";
import { useDrop } from "react-dnd";
import { FaTrashAlt } from "react-icons/fa";
import style from "../css/assigned.module.css";

export default function TaggedImages({ tag, tags, i, setTags }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToTag(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addImageToTag(item) {
    const temp = [...tags];
    temp[i].imgs.push(item);
    setTags(temp);
  }

  function unTagImg(i, j) {
    const temp = [...tags];
    temp[i].imgs.splice(j, 1);
    setTags(temp);
  }

  return (
    <div className={style.tagCard} ref={drop}>
      <p style={{ background: tag.color }} className={style.tagname}>{tag.name}</p>
      {tag.imgs.length
        ? tag.imgs.map((img, j) => (
            <div key={j} className={style.taggedImgs}>
              <img src={img.img} />
              <p>{img.name}</p>
              <span title="Remove">
                <FaTrashAlt
                  onClick={() => {
                    unTagImg(i, j);
                  }}
                />
              </span>
            </div>
          ))
        : "No images yet"}
    </div>
  );
}
