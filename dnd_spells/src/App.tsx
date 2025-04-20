import { Button } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Campaign, CampaignSimplified } from "./types";

function App() {
  const [viewedCampaign, setViewedCampaign] = useState<null | number>(null);
  const campaigns: CampaignSimplified[] = [
    { id: 0, name: "Campaign 1" },
    { id: 1, name: "Campaign 2" },
  ];
  const campaignsFull: Campaign[] = [
    {
      id: 0,
      name: "Campaign 1",
      description: "Description of Campaign 1",
      players: ["Player 1", "Player 2"],
      quests: [
        { id: 0, name: "Quest 1", description: "Description of Quest 1" },
        { id: 1, name: "Quest 2", description: "Description of Quest 2" },
      ],
      characters: ["Character 1", "Character 2"],
      npcs: ["NPC 1", "NPC 2"],
      notes: ["Note 1", "Note 2"],
    },
    {
      id: 1,
      name: "Campaign 2",
      description: "Description of Campaign 2",
      players: ["Player A", "Player B"],
      quests: [
        { id: 0, name: "Quest A", description: "Description of Quest A" },
        { id: 1, name: "Quest B", description: "Description of Quest B" },
      ],
      characters: ["Character A", "Character B"],
      npcs: ["NPC A", "NPC B"],
      notes: ["Note A", "Note B"],
    },
  ];
  const deletecampaign = (id: number) => {
    console.log("Deleting campaign with id:", id);
    // Implement the delete logic here
  };

  return (
    <div>
      <div className="outerCardDiv">
        {viewedCampaign === null && (
          <div>
            {campaigns.map((campaign, index) => (
              <div key={index} className="card">
                <div className="cardContent">
                  <h2>{campaign.name}</h2>
                  <Button variant="contained" onClick={() => setViewedCampaign(campaign.id)} color="primary">
                    View Campaign
                  </Button>
                  <Button variant="contained" color="secondary">
                    Delete Campaign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {viewedCampaign !== null && (
          <div>
            {campaignsFull
              .filter((campaign) => campaign.id === viewedCampaign)
              .map((campaign, index) => (
                <div key={index} className="card">
                  <div className="cardContent">
                    <h2>{campaign.name}</h2>
                    <p>{campaign.description}</p>
                    <Button variant="contained" onClick={() => setViewedCampaign(null)} color="primary">
                      Back to Campaigns
                    </Button>
                    <Button variant="contained" onClick={() => deletecampaign(campaign.id)} color="secondary">
                      Delete Campaign
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
