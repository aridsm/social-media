import type { User } from "../users/types";

export type Level = 1 | 2 | 3;

export type Post = {
  id: number;
  userId: number;
  date: string;
  views: number;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
  post: string;
  level: Level;
  parentId?: number;
  edited?: boolean;
};

export type FindParams = {
  level?: Level;
  parentId?: number;
  userId?: number;
};
