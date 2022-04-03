import { useState, useContext } from "react";
import { tagsContext } from "../context/TagsContext.js";
import style from "../css/assigned.module.css";
import TaggedImages from "./TaggedImages.jsx";

export default function Assigned() {
  const STORAGE_KEY = "userTags";
  const [search, setSearch] = useState("");
  const { tags, setTags } = useContext(tagsContext);


  const tagsElement = tags
    .filter((value) => {
      if (search === "") return value;
      else if (value.name.toLowerCase().includes(search.toLowerCase()))
        return value;
    })
    .map((tag, i) => (
      <TaggedImages key={i} tag={tag} i={i} tags={tags} setTags={setTags} />
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
