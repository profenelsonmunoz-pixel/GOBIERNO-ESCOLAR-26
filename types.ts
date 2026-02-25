
export type AppTab = 'inicio' | 'normativa' | 'cronograma' | 'roles' | 'candidatos' | 'ai-assistant';

export interface Message {
  role: 'user' | 'ai' | 'system';
  content: string;
}

export interface CampaignData {
  name: string;
  role: string;
  focus: string;
}

export interface TimelineStep {
  date: string;
  title: string;
  desc: string;
  status: 'past' | 'active' | 'upcoming';
  highlight?: boolean;
}
