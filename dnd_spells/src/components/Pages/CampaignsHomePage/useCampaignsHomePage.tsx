import { useState } from "react";
import { Campaign, CampaignSimplified } from "../../../types";

interface CampaignsHomePageProps {
  setSimplifiedCampaigns: React.Dispatch<React.SetStateAction<CampaignSimplified[]>>;
  setLoading: (loading: boolean) => void;
  currentUserId: number | null;
  fetchUserCampaigns: (userId: number) => Promise<CampaignSimplified[]>;
}

const useCampaignsHomePage = ({ setSimplifiedCampaigns, setLoading, currentUserId, fetchUserCampaigns }: CampaignsHomePageProps) => {
  const [viewedCampaign, setViewedCampaign] = useState<null | number>(null);
  const [currentViewed, setCurrentViewed] = useState<"Notes" | "Quests" | "Characters" | "NPCs">("Notes");
  const [currentViewedCharacter, setCurrentViewedCharacter] = useState<null | number>(null);
  const [currentCampaign, setCurrentCampaign] = useState<null | Campaign>(null);
  const [currentOpenModal, setCurrentOpenModal] = useState<"campaign" | "spell" | "character" | "note" | "npc" | "quest" | null>(null);

  const editViewedCampaign = async (campaignId: number | null) => {
    if (campaignId !== null) {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/campaigns/${campaignId}`);
        if (!res.ok) throw new Error("Failed to fetch campaign");

        const campaign: Campaign = await res.json();
        setCurrentCampaign(campaign);
        setViewedCampaign(campaignId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentCampaign(null);
      setViewedCampaign(null);
    }
  };

  const isCurrentViewed = (viewed: "Notes" | "Quests" | "Characters" | "NPCs") => {
    return currentViewed === viewed;
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
  const deleteCampaign = async (campaignId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/campaigns/${campaignId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete campaign");
      }

      setCurrentCampaign(null);
      setViewedCampaign(null);

      // Refetch simplified campaigns for current user
      if (currentUserId !== null) {
        setLoading(true); // Optional: shows spinner during update
        const updatedCampaigns = await fetchUserCampaigns(currentUserId);
        setSimplifiedCampaigns(updatedCampaigns);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
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

      // Update simplifiedCampaigns state with the newly created campaign
      setSimplifiedCampaigns((prev) => [...prev, createdCampaign]);
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

  return {
    viewedCampaign,
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
    addNewCharacter,
    addNote,
    addQuest,
    addNPC,
    addSpell,
    setCurrentViewed,
    setCurrentViewedCharacter,
    currentOpenModal,
    setCurrentOpenModal,
  };
};

export default useCampaignsHomePage;
