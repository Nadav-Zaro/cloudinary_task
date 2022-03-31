import {useContext} from 'react'
import { tagsContext } from "../context/TagsContext.js";
import style from "../css/unassigned.module.css"
import ImageComponent from './ImageList.jsx';

export default function Unassigned() {
    const { imgs } = useContext(tagsContext);
  
    const imgsElement = imgs ? imgs.map((img,i)=>(
    <div key={i} className={style.card}>
      <ImageComponent img={img} />
    </div>
    )) : ""

  return (
    <div className={style.unassignedHolder}>
        <h2>Unassigned</h2>
        <div className={style.unassigned}>
        {imgsElement}
        </div>
    </div>
  )
}
