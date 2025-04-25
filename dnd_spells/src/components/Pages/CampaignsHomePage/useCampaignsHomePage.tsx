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
  const deleteQuest = async (questId: number) => {
    try {
      if (!currentCampaign) {
        throw new Error("No campaign selected");
      }
      const res = await fetch(`http://localhost:8080/campaigns/${currentCampaign.id}/quests/${questId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete quest");

      setCurrentCampaign((prev) => ({
        ...prev!,
        quests: prev!.quests.filter((q) => q.id !== questId),
      }));
    } catch (err) {
      console.error("Error deleting quest:", err);
    }
  };

  const deleteCharacter = async (characterId: number) => {
    try {
      if (!currentCampaign) {
        throw new Error("No campaign selected");
      }
      const res = await fetch(`http://localhost:8080/campaigns/${currentCampaign.id}/characters/${characterId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete character");

      setCurrentViewedCharacter(null);
      setCurrentCampaign((prev) => ({
        ...prev!,
        characters: prev!.characters.filter((c) => c.id !== characterId),
      }));
    } catch (err) {
      console.error("Error deleting character:", err);
    }
  };

  const deleteNPC = async (npcId: number) => {
    try {
      if (!currentCampaign) {
        throw new Error("No campaign selected");
      }
      const res = await fetch(`http://localhost:8080/campaigns/${currentCampaign.id}/npcs/${npcId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete NPC");

      setCurrentCampaign((prev) => ({
        ...prev!,
        npcs: prev!.npcs.filter((n) => n.id !== npcId),
      }));
    } catch (err) {
      console.error("Error deleting NPC:", err);
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      if (!currentCampaign) {
        throw new Error("No campaign selected");
      }
      const res = await fetch(`http://localhost:8080/campaigns/${currentCampaign.id}/notes/${noteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete note");

      setCurrentCampaign((prev) => ({
        ...prev!,
        notes: prev!.notes.filter((n) => n.id !== noteId),
      }));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
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
  const addNewCharacter = () => {
    setCurrentOpenModal("character");
  };

  const addNote = () => {
    setCurrentOpenModal("note");
  };
  const addQuest = () => {
    setCurrentOpenModal("quest");
  };
  const addNPC = () => {
    setCurrentOpenModal("npc");
  };

  const createNPC = async (campaignId: number, name: string, description: string) => {
    try {
      const res = await fetch(`http://localhost:8080/campaigns/${campaignId}/npcs`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to add NPC");
      }

      const newNPC = await res.json();
      console.log("Created NPC:", newNPC);
      setCurrentCampaign((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          npcs: [...prev.npcs, newNPC],
        };
      });
    } catch (error) {
      console.error("Error creating NPC:", error);
    }
  };

  const createCharacter = async (campaignId: number, character: any) => {
    try {
      const res = await fetch(`http://localhost:8080/campaigns/${campaignId}/characters`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(character),
      });

      if (!res.ok) {
        throw new Error("Failed to add character");
      }

      const newCharacter = await res.json();
      console.log("Created Character:", newCharacter);
      setCurrentCampaign((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          characters: [...prev.characters, newCharacter],
        };
      });
    } catch (error) {
      console.error("Error creating character:", error);
    }
  };

  const createNote = async (campaignId: number, title: string, description: string) => {
    try {
      const res = await fetch(`http://localhost:8080/campaigns/${campaignId}/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to add note");
      }

      const newNote = await res.json();
      console.log("Created Note:", newNote);
      setCurrentCampaign((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          notes: [...prev.notes, newNote],
        };
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };
  const createQuest = async (campaignId: number, name: string, description: string) => {
    try {
      const res = await fetch(`http://localhost:8080/campaigns/${campaignId}/quests`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to add quest");
      }

      const newQuest = await res.json();
      console.log("Created Quest:", newQuest);
      setCurrentCampaign((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          quests: [...prev.quests, newQuest],
        };
      });
    } catch (error) {
      console.error("Error creating quest:", error);
    }
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

  return {
    viewedCampaign,
    currentViewed,
    currentViewedCharacter,
    currentCampaign,
    editViewedCampaign,
    isCurrentViewed,
    deleteQuest,
    deleteCharacter,
    deleteNPC,
    deleteNote,
    deleteCampaign,
    addCampaign,
    createCampaign,
    addNewCharacter,
    addNote,
    addQuest,
    addNPC,
    setCurrentViewed,
    setCurrentViewedCharacter,
    currentOpenModal,
    setCurrentOpenModal,
    createNote,
    createQuest,
    createCharacter,
    createNPC,
  };
};

export default useCampaignsHomePage;
