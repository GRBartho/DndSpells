export interface Spell {
  id: number;
  name: string;
  description: string;
}

export interface CampaignSimplified {
  id: number;
  name: string;
}

export interface Quest {
  id: number;
  name: string;
  description: string;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  players: string[];
  quests: Quest[];
  characters: string[];
  npcs: string[];
  notes: string[];
}

export interface Character {
  id: number;
  name: string;
  class: string;
  hp: number;
  race: string;
  level: number;
  spells: Spell[];
}

export interface NPC {
  id: number;
  name: string;
  description: string;
}
