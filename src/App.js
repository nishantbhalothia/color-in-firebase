import React, { useEffect, useState } from "react";
import "./App.css";
import db from "./db/firebase";
import { collection, onSnapshot, query, orderBy,} from "firebase/firestore";
import { addColor , editColor, deleteColor , deleteMultipleColor } from "./utils";

function App() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "colors");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setColors(result);
    });
    return unsubscribe;
  }, []);

  

  return (
    <div className="App">
      <div>
        <h1>React App</h1>
        <button onClick={addColor}> Add color</button>
        <button onClick={deleteMultipleColor}> Delete color</button>
      </div>
      <br />
      <div>
        {colors.map((color) => (
          <div key={color.id} style={{ display: "flex", flexDirection: "row" , margin:'1em' }}>
            <button onClick={()=>editColor(color.id)}>
              Edit
            </button>
            &emsp;
            <button onClick={()=>deleteColor(color.id)}>
              Delete
            </button>
            &emsp;
            <div
              style={{
                backgroundColor: color.value,
                height: "25px",
                width: "25px",
                borderRadius: "50%",
              }}
            ></div> &emsp;
            <span>{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
