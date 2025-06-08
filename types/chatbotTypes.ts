
export interface KnowledgeItem {
  id: string;
  text: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  sources?: { uri: string; title: string }[];
}

export enum ChatView {
  KNOWLEDGE = 'knowledge',
  CHAT = 'chat',
}
