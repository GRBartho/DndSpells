import { useState, useEffect } from "react";
import { CampaignSimplified } from "./types";

const useApp = () => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentTypedUser, setCurrentTypedUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [simplifiedCampaigns, setSimplifiedCampaigns] = useState<CampaignSimplified[]>([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("currentUserId");
    if (storedUserId !== null) {
      const loadCampaigns = async () => {
        const campaigns = await fetchUserCampaigns(parseInt(storedUserId));
        setSimplifiedCampaigns(campaigns);
        setLoading(false);
      };
      loadCampaigns();
      setCurrentUserId(parseInt(storedUserId));
      setLoading(false);
    }
  }, []);

  const findUser = async (creatingUser: boolean) => {
    try {
      const endpoint = creatingUser ? "/users/create" : "/users/login";
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentTypedUser),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Something went wrong");
        return;
      }

      const user = await res.json();
      setCurrentUserId(user.id);
      localStorage.setItem("currentUserId", user.id.toString());

      setLoading(true);
      const campaigns = await fetchUserCampaigns(user.id);
      setSimplifiedCampaigns(campaigns);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

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

  return {
    currentUserId,
    setCurrentUserId,
    findUser,
    setCurrentTypedUser,
    loading,
    setLoading,
    simplifiedCampaigns,
    setSimplifiedCampaigns,
    fetchUserCampaigns,
  };
};

export default useApp;
