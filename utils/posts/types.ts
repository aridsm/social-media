export type Level = 1 | 2 | 3;

export type Post = {
  id: number;
  userId: number;
  user: {
    id: number;
    userName: string;
    name: string;
    photo?: string;
    backgroundPhoto?: string;
    isFollowing: boolean;
  };
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

export type User = {
  id: number;
  userName: string;
  name: string;
  description?: string;
  photo?: string;
  backgroundPhoto?: string;
  followers: User[];
  following: User[];
  isFollowing: boolean;
  generalInformations?: GeneralInformation;
};

export type GeneralInformation = {
  livingIn: string;
  placeOfBirth: string;
  dateOfBirth: string;
  relationShip?: RelationShip;
  gender?: Gender;
};

export enum RelationShip {
  Single = 1,
  Married = 2,
  InARelationShip = 3,
  Divorced = 4,
  Widowed = 5,
}

export enum Gender {
  Female = 1,
  Male = 2,
  Other = 3,
}

export type FindParams = {
  level?: Level;
  parentId?: number;
  userId?: number;
};
