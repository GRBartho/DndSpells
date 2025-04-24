import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs-extra";
import { Campaign } from "./types";

const app = express();
const PORT = process.env.PORT || 8080;

const CAMPAIGNS_FILE = "campaigns.json";

app.use(cors());
app.use(express.json());

// ========== Campaign Helpers ==========
const getCampaigns = (): Campaign[] => {
  return fs.readJsonSync(CAMPAIGNS_FILE, { throws: false }) || [];
};

const saveCampaigns = (campaigns: Campaign[]): void => {
  fs.writeJsonSync(CAMPAIGNS_FILE, campaigns, { spaces: 2 });
};

// ========== Routes ==========

// POST /campaigns
app.post("/campaigns", ((req: Request, res: Response) => {
  const { name, system, userId } = req.body;

  if (userId === undefined || name === undefined || system === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const campaigns = getCampaigns();
  const newCampaign: Campaign = {
    id: campaigns.length ? campaigns[campaigns.length - 1].id + 1 : 1,
    name,
    system,
    userId,
    players: [],
    quests: [],
    characters: [],
    npcs: [],
    notes: [],
  };

  campaigns.push(newCampaign);
  saveCampaigns(campaigns);

  res.status(201).json(newCampaign);
}) as express.RequestHandler);

// GET /campaigns/user/:userId - Get simplified campaigns for a user
app.get("/campaigns/user/:userId", (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const campaigns = getCampaigns();

  const simplified = campaigns.filter((c) => c.userId === userId).map(({ id, name, userId, system }) => ({ id, name, userId, system }));

  res.json(simplified);
});

// GET /campaigns/:id - Get full campaign by ID
app.get("/campaigns/:id", ((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const campaigns = getCampaigns();

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  res.json(campaign);
}) as express.RequestHandler);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
