export interface Message {
  id: number;
  message: string;
  read: boolean;
  date: Date | string;
  own: boolean;
}

export interface Chat {
  id: number;
  userId: number;
  messages: Message[];
}
