import { useState, useEffect } from "react";
import { CampaignSimplified } from "./types";

const useApp = () => {
  const users = [
    { id: 0, username: "User1", password: "password1" },
    { id: 1, username: "User2", password: "password2" },
  ];
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

  const findUser = async () => {
    const user = users.find((user) => user.username === currentTypedUser.username && user.password === currentTypedUser.password);

    if (user) {
      setCurrentUserId(user.id);
      localStorage.setItem("currentUserId", user.id.toString());
      setLoading(true);

      const campaigns = await fetchUserCampaigns(user.id);
      console.log("Fetched campaigns:", campaigns);
      setSimplifiedCampaigns(campaigns);
      setLoading(false);
    } else {
      alert("Invalid username or password");
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
