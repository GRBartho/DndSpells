import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [spells, setSpells] = useState<any[]>([]); // State to store fetched spells
  const [id, setId] = useState<number>(0); // State to store ID for deletion

  // Async function to fetch data
  async function getData() {
    const url = "http://127.0.0.1:8080/spells";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setSpells(json); // Store spells in state
    } catch (error: any) {
      console.error(error.message);
    }
  }

  // Handle delete logic
  async function handleDelete() {
    const url = `http://127.0.0.1:8080/spells/${id}`; // Adjust URL based on actual API
    try {
      const response = await fetch(url, {
        method: "DELETE", // Specify DELETE method
      });

      if (!response.ok) {
        throw new Error(`Failed to delete spell with ID: ${id}`);
      }

      // Remove the deleted spell from the state (UI update)
      setSpells(spells.filter((spell) => spell.id !== id));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {/* Render the spells in a list */}
        <div>
          {spells.length > 0 ? (
            <ul>
              {spells.map((spell) => (
                <li key={spell.id}>
                  {spell.name} - {spell.damage}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading spells...</p>
          )}
        </div>

        {/* Input for entering the ID to delete */}
        <input type="number" value={id} onChange={(e) => setId(Number(e.target.value))} placeholder="Enter spell ID" />
        <button onClick={handleDelete}>Delete</button>

        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
