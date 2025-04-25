export interface Spell {
  id: number;
  name: string;
  description: string;
}

export interface CampaignSimplified {
  id: number;
  name: string;
  system: string;
  userId: number;
}

export interface Quest {
  id: number;
  name: string;
  description: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface Campaign {
  id: number;
  name: string;
  userId: number;
  system: string;
  players: string[];
  quests: Quest[];
  characters: Character[];
  npcs: NPC[];
  notes: Note[];
}

export interface Character {
  id: number;
  name: string;
  class: string;
  hp: number;
  race: string;
  level: number;
  description: string;
}

export interface NPC {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}
