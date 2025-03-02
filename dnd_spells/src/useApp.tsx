import { useState, useEffect } from "react";
import { Spell } from "./types";

const useApp = () => {
  const [spells, setSpells] = useState<any[]>([]);
  const [showingIndividual, setShowingIndividual] = useState<boolean>(false);
  const [newSpellProperties, setNewSpellProperties] = useState<Spell>({
    id: 0,
    name: "",
    damage: "",
    description: "",
    damage_type: "",
    school: "",
  });

  const changeSpellProperties = (text: string, property: "name" | "damage" | "description" | "damage_type" | "school") => {
    setNewSpellProperties((oldSpell) => ({ ...oldSpell, [property]: text }));
  };

  const openIndividualSpell = (id: number) => {
    setShowingIndividual(true);
    getIndividialData(id);
  };

  const backToAllSpells = () => {
    setShowingIndividual(false);
    getData();
  };

  async function getData() {
    const url = "http://127.0.0.1:8080/spells";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setSpells(json);
    } catch (error: any) {
      console.error(error.message);
    }
  }
  async function createNewSpell() {
    const url = "http://127.0.0.1:8080/spells";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpellProperties),
      });

      if (!response.ok) {
        throw new Error("Failed to create spell");
      }

      setNewSpellProperties({ id: 0, name: "", damage: "", description: "", damage_type: "", school: "" });

      getData();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function editSpell(id: number) {
    const url = `http://127.0.0.1:8080/spells/${id}`;
    setNewSpellProperties((newSpell) => spells.filter((spell) => spell.id === id)[0]);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpellProperties),
      });

      if (!response.ok) {
        throw new Error("Failed to create spell");
      }

      setNewSpellProperties({ id: 0, name: "", damage: "", description: "", damage_type: "", school: "" });

      getIndividialData(id);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleDelete(id: string) {
    const url = `http://127.0.0.1:8080/spells/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete spell with ID: ${id}`);
      }

      setSpells(spells.filter((spell) => spell.id !== id));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function getIndividialData(id: number) {
    const url = `http://127.0.1:8080/spells/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setSpells(json);
    } catch (error: any) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const finishCreateForm = () => {
    if (!newSpellProperties.description || !newSpellProperties.name || !newSpellProperties.school) {
      alert(
        "Please fill in the following fields: " +
          `${!newSpellProperties.description ? "description" : ""}` +
          `${!newSpellProperties.name ? ", name" : ""}` +
          `${!newSpellProperties.school ? ", school" : ""}`
      );
    } else {
      createNewSpell();
    }
  };

  return { backToAllSpells, spells, openIndividualSpell, showingIndividual, handleDelete, newSpellProperties, changeSpellProperties, finishCreateForm, editSpell };
};

export default useApp;
