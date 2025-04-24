import { useState, useEffect } from "react";
import { Campaign, CampaignSimplified } from "./types";

const useApp = () => {
  const campaigns: CampaignSimplified[] = [
    {
      id: 0,
      name: "Campaign 1",
      userId: 0,
      system: "Dungeons and Dragons",
    },
    {
      id: 1,
      name: "Campaign 1",
      userId: 1,
      system: "Dungeons and Dragons",
    },
  ];
  const users = [
    { id: 0, username: "User1", password: "password1" },
    { id: 1, username: "User2", password: "password2" },
  ];
  const campaignsFull: Campaign[] = [
    {
      id: 0,
      userId: 0,
      name: "Campaign 1",
      system: "Dungeons and Dragons",
      players: ["Player 1", "Player 2"],
      quests: [
        { id: 0, name: "Quest 1", description: "Description of Quest 1" },
        { id: 1, name: "Quest 2", description: "Description of Quest 2" },
      ],
      characters: [
        { id: 0, name: "Character 1", class: "Warrior", race: "Elf", hp: 100, level: 1, spells: [{ id: 0, name: "fireball", description: "ball of fire" }] },
        {
          id: 1,
          name: "Marco",
          class: "Wizard",
          race: "Human",
          hp: 50,
          level: 1,
          spells: [
            { id: 0, name: "Create Water", description: "Creates Water on a specific area" },
            { id: 1, name: "Lightning Bolt", description: "Makes a large lightning bold in a direction dealing massive damage" },
          ],
        },
      ],
      npcs: [
        { id: 0, name: "NPC 1", description: "Description of NPC 1" },
        {
          id: 2,
          name: "NPC 3",
          description:
            "Very Ultra Long Description of npc number 3 just to see how it stays when I make it very long Very Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very longVery Ultra Long Description of npc number 3 just to see how it stays when I make it very long",
        },
      ],
      notes: [
        { id: 0, title: "Note 1", content: "Content of Note 1" },
        { id: 1, title: "Note 2", content: "Content of Note 2" },
      ],
    },
    {
      id: 1,
      userId: 1,
      name: "Campaign 1",
      system: "Dungeons and Dragons",
      players: ["Player A", "Player B"],
      quests: [
        { id: 0, name: "Quest A", description: "Description of Quest A" },
        { id: 1, name: "Quest B", description: "Description of Quest B" },
      ],
      characters: [{ id: 0, name: "Character 1", class: "Warrior", race: "Elf", hp: 100, level: 1, spells: [] }],
      npcs: [{ id: 0, name: "NPC 1", description: "Description of NPC 1" }],
      notes: [
        { id: 0, title: "Note 1", content: "Content of Note 1" },
        { id: 1, title: "Note 2", content: "Content of Note 2" },
      ],
    },
  ];

  const [viewedCampaign, setViewedCampaign] = useState<null | number>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentTypedUser, setCurrentTypedUser] = useState({ username: "", password: "" });
  const [currentViewed, setCurrentViewed] = useState<"Notes" | "Quests" | "Characters" | "NPCs">("Notes");
  const [currentViewedCharacter, setCurrentViewedCharacter] = useState<null | number>(null);
  const [currentCampaign, setCurrentCampaign] = useState<null | Campaign>(null);
  const [currentOpenModal, setCurrentOpenModal] = useState<"campaign" | "spell" | "character" | "note" | "npc" | "quest" | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("currentUserId");
    if (storedUserId !== null) {
      setCurrentUserId(parseInt(storedUserId));
    }
  }, []);

  const editViewedCampaign = (campaignId: number | null) => {
    if (campaignId !== null) {
      const campaign = campaignsFull.find((campaign) => campaign.id === campaignId);
      if (campaign) {
        setCurrentCampaign(campaign);
        setViewedCampaign(campaignId);
      }
    } else {
      setCurrentCampaign(null);
      setViewedCampaign(null);
    }
  };

  const isCurrentViewed = (viewed: "Notes" | "Quests" | "Characters" | "NPCs") => {
    return currentViewed === viewed;
  };

  const findUser = () => {
    const user = users.find((user) => user.username === currentTypedUser.username && user.password === currentTypedUser.password);
    if (user) {
      setCurrentUserId(user.id);
      localStorage.setItem("currentUserId", user.id.toString());
    } else {
      alert("Invalid username or password");
    }
  };

  //Fetch Functions
  const fetchUserCampaigns = async (userId: number): Promise<CampaignSimplified[]> => {
    try {
      const res = await fetch(`http://localhost:8080/campaigns/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const fetchCampaignById = async (campaignId: number): Promise<Campaign | null> => {
    try {
      const res = await fetch(`http://localhost:8080/campaigns/${campaignId}`);
      if (!res.ok) throw new Error("Failed to fetch campaign");
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  //Delete functions
  const deleteQuest = (questId: number) => {
    console.log("Deleting quest with id:", questId);
    // Implement the delete logic here
  };
  const deleteCharacter = (characterId: number) => {
    console.log("Deleting character with id:", characterId);
    // Implement the delete logic here
  };
  const deleteSpell = (spellId: number) => {
    console.log("Deleting spell with id:", spellId);
    // Implement the delete logic here
  };
  const deleteNPC = (npcId: number) => {
    console.log("Deleting NPC with id:", npcId);
    // Implement the delete logic here
  };
  const deleteNote = (noteId: number) => {
    console.log("Deleting note with id:", noteId);
    // Implement the delete logic here
  };
  const deleteCampaign = (campaignId: number) => {
    console.log("Deleting campaign with id:", campaignId);
    // Implement the delete logic here
  };

  //Add functions

  const addCampaign = () => {
    setCurrentOpenModal("campaign");
  };

  const createCampaign = async (newCampaign: CampaignSimplified) => {
    try {
      const res = await fetch("http://localhost:8080/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      });

      if (!res.ok) {
        throw new Error("Failed to create campaign");
      }

      const createdCampaign = await res.json();
      console.log("Created Campaign:", createdCampaign);

      // Optional: push to local campaign list if storing locally
      // setCampaigns([...campaigns, createdCampaign]);

      // Or trigger refetch if you're fetching campaigns elsewhere
      // await fetchCampaigns();
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCharacter = () => {
    setCurrentOpenModal("character");
    // Implement the add logic here
  };

  const addNote = () => {
    setCurrentOpenModal("note");
    // Implement the add logic here
  };
  const addQuest = () => {
    setCurrentOpenModal("quest");
    // Implement the add logic here
  };
  const addNPC = () => {
    setCurrentOpenModal("npc");
    // Implement the add logic here
  };
  const addSpell = () => {
    setCurrentOpenModal("spell");
    // Implement the add logic here
  };

  /*   const [spells, setSpells] = useState<any[]>([]);
  const [showingIndividual, setShowingIndividual] = useState<boolean>(false);
  const defaultSpell = { id: 0, name: "", damage: "", description: "", damage_type: "", school: "" };
  const [newSpellProperties, setNewSpellProperties] = useState<Spell>(defaultSpell);

  const changeSpellProperties = (text: string, property: "name" | "damage" | "description" | "damage_type" | "school") => {
    setNewSpellProperties((oldSpell) => ({ ...oldSpell, [property]: text }));
  };

  const openIndividualSpell = (id: number) => {
    setShowingIndividual(true);
    getIndividialData(id);
    setNewSpellProperties(spells[0]);
  };

  const backToAllSpells = () => {
    setShowingIndividual(false);
    setNewSpellProperties(defaultSpell);
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

  return { backToAllSpells, spells, openIndividualSpell, showingIndividual, handleDelete, newSpellProperties, changeSpellProperties, finishCreateForm, editSpell }; */
  return {
    viewedCampaign,
    currentUserId,
    currentViewed,
    currentViewedCharacter,
    currentCampaign,
    editViewedCampaign,
    isCurrentViewed,
    deleteQuest,
    deleteCharacter,
    deleteSpell,
    deleteNPC,
    deleteNote,
    deleteCampaign,
    addCampaign,
    createCampaign,
    findUser,
    addNewCharacter,
    addNote,
    addQuest,
    addNPC,
    addSpell,
    campaigns,
    setCurrentTypedUser,
    setCurrentViewed,
    setCurrentViewedCharacter,
    setCurrentUserId,
    currentOpenModal,
    setCurrentOpenModal,
    fetchUserCampaigns,
    fetchCampaignById,
  };
};

export default useApp;
