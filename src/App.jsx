import { useState, useEffect } from "react";
import "./App.css";
import Unassigned from "./components/Unassigned";
import Tags from "./components/Tags";
import Assigned from "./components/Assigned";
import { tagsContext } from "./context/TagsContext.js";
import axios from "axios";
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

function App() {
  const [imgs, setImgs] = useState(null);
  const [tags, setTags] = useState([
    { name: "Tag1", imgs: [], color: "green" },
    { name: "Tag2", imgs: [], color: "yellow" },
    { name: "Tag3", imgs: [], color: "red" },
  ]);
  const STORAGE_KEY = "userTags";

  useEffect(() => {
    getImages();
    getUserTags()
  }, []);

  useEffect(updateTags, [tags])
  

  function getImages() {
    axios
      .get("https://picsum.photos/v2/list?page=5&limit=12")
      .then((res) => {
        setImgs(res.data);
      })
      .catch((err) => console.log(err.response));
  }

  function getUserTags() {
    let userTags = localStorage.getItem(STORAGE_KEY);
    return userTags ? setTags(JSON.parse(userTags)) : null;
  }

  function updateTags() {
    let temp = JSON.stringify(tags)
    localStorage.setItem(STORAGE_KEY,temp)
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <tagsContext.Provider value={{ tags, setTags, imgs, setImgs }}>
        <Tags />
        <Unassigned />
        <Assigned />
      </tagsContext.Provider>
    </div>
    </DndProvider>
  );
}

export default App;
