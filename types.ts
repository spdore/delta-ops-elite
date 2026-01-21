
export interface Operator {
  id: string;
  name: string;
  role: string;
  kd: number;
  winRate: string;
  specialty: string;
  image: string;
  rank: string;
  // New detailed fields
  description: string;
  mainWeapons: string[];
  tacticalStyle: string[]; // e.g., ["Aggressive", "Tactical", "Looter"]
  radarStats: {
    aim: number;
    survival: number;
    support: number;
    awareness: number;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string; // New field for discount logic
  discountLabel?: string; // New field for discount label
  features: string[];
  recommended?: boolean;
  color: string;
  // Detailed fields for Modal
  description: string;
  serviceLevel: string;
  equipmentPolicy: string;
  exclusivePerks: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
