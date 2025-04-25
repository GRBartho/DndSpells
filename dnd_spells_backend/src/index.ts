import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs-extra";
import { Campaign, Character, User } from "./types";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8080;

const CAMPAIGNS_FILE = "campaigns.json";
const USERS_FILE = "users.json";

app.use(cors());
app.use(express.json());

const usersPath = USERS_FILE;
const getUsers = () => JSON.parse(fs.readFileSync(usersPath, "utf-8"));
const saveUsers = (users: any[]) => fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

// ========== Campaign Helpers ==========
const getCampaigns = (): Campaign[] => {
  return fs.readJsonSync(CAMPAIGNS_FILE, { throws: false }) || [];
};

const saveCampaigns = (campaigns: Campaign[]): void => {
  fs.writeJsonSync(CAMPAIGNS_FILE, campaigns, { spaces: 2 });
};

// ========== Routes ==========

//Create Campaign
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

//Get simplified campaigns from a user
app.get("/campaigns/user/:userId", (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const campaigns = getCampaigns();

  const simplified = campaigns.filter((c) => c.userId === userId).map(({ id, name, userId, system }) => ({ id, name, userId, system }));

  res.json(simplified);
});

//Delete Campaign
app.delete("/campaigns/:id", ((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const campaigns = getCampaigns();
  const updatedCampaigns = campaigns.filter((c) => c.id !== id);
  saveCampaigns(updatedCampaigns);
  res.status(204).send();
}) as express.RequestHandler);

//Get full campaign by ID
app.get("/campaigns/:id", ((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const campaigns = getCampaigns();

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  res.json(campaign);
}) as express.RequestHandler);

// Add Note
app.put("/campaigns/:id/notes", ((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Missing note title or description" });
  }

  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  const newNote = {
    id: campaign.notes.length ? campaign.notes[campaign.notes.length - 1].id + 1 : 1,
    title,
    content: description,
  };

  campaign.notes.push(newNote);
  saveCampaigns(campaigns);

  res.status(200).json(newNote);
}) as express.RequestHandler);

// Add Quest
app.put("/campaigns/:id/quests", ((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing quest title or description" });
  }

  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  const newQuest = {
    id: campaign.quests.length ? campaign.quests[campaign.quests.length - 1].id + 1 : 1,
    name,
    description,
  };

  campaign.quests.push(newQuest);
  saveCampaigns(campaigns);

  res.status(200).json(newQuest);
}) as express.RequestHandler);

// Add Character
app.put("/campaigns/:id/characters", ((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, class: charClass, hp, race, level, description } = req.body;

  if (!name || !charClass || !hp || !race || !level || !description) {
    return res.status(400).json({ error: "Missing information" });
  }

  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  const newCharacter: Character = {
    id: campaign.characters.length ? campaign.characters[campaign.characters.length - 1].id + 1 : 1,
    name,
    class: charClass,
    hp,
    race,
    level,
    description,
  };

  campaign.characters.push(newCharacter);
  saveCampaigns(campaigns);

  res.status(200).json(newCharacter);
}) as express.RequestHandler);

// Add NPC
app.put("/campaigns/:id/npcs", ((req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing NPC name or description" });
  }

  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  const newNPC = {
    id: campaign.npcs.length ? campaign.npcs[campaign.npcs.length - 1].id + 1 : 1,
    name,
    description,
  };

  campaign.npcs.push(newNPC);
  saveCampaigns(campaigns);

  res.status(200).json(newNPC);
}) as express.RequestHandler);

//Delete Quest
app.delete("/campaigns/:id/quests/:questId", ((req, res) => {
  const campaignId = parseInt(req.params.id);
  const questId = parseInt(req.params.questId);
  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);

  if (!campaign) return res.status(404).json({ error: "Campaign not found" });

  campaign.quests = campaign.quests.filter((q) => q.id !== questId);
  saveCampaigns(campaigns);

  res.sendStatus(204);
}) as express.RequestHandler);

// Delete Character
app.delete("/campaigns/:id/characters/:characterId", ((req, res) => {
  const campaignId = parseInt(req.params.id);
  const characterId = parseInt(req.params.characterId);
  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);

  if (!campaign) return res.status(404).json({ error: "Campaign not found" });

  campaign.characters = campaign.characters.filter((c) => c.id !== characterId);
  saveCampaigns(campaigns);

  res.sendStatus(204);
}) as express.RequestHandler);

// Delete NPC
app.delete("/campaigns/:id/npcs/:npcId", ((req, res) => {
  const campaignId = parseInt(req.params.id);
  const npcId = parseInt(req.params.npcId);
  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);

  if (!campaign) return res.status(404).json({ error: "Campaign not found" });

  campaign.npcs = campaign.npcs.filter((n) => n.id !== npcId);
  saveCampaigns(campaigns);

  res.sendStatus(204);
}) as express.RequestHandler);

// Delete Note
app.delete("/campaigns/:id/notes/:noteId", ((req, res) => {
  const campaignId = parseInt(req.params.id);
  const noteId = parseInt(req.params.noteId);
  const campaigns = getCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);

  if (!campaign) return res.status(404).json({ error: "Campaign not found" });

  campaign.notes = campaign.notes.filter((n) => n.id !== noteId);
  saveCampaigns(campaigns);

  res.sendStatus(204);
}) as express.RequestHandler);

// ========== User Routes ==========
// Create User
app.post("/users/create", ((req, res) => {
  const { username, password } = req.body;
  const users: User[] = getUsers();

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 0,
    username,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  res.status(200).json({ id: newUser.id, username: newUser.username });
}) as express.RequestHandler);

// Login User
app.post("/users/login", ((req, res) => {
  const { username, password } = req.body;
  const users: User[] = getUsers();

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.status(200).json({ id: user.id, username: user.username });
}) as express.RequestHandler);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
