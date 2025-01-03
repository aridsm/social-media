export type User = {
  id: number;
  userName: string;
  name: string;
  description?: string;
  photo?: string;
  backgroundPhoto?: string;
  followersIds: number[];
  followingIds: number[];
  isFollowing: boolean;
  online: boolean;
  generalInformations: GeneralInformation;
  contactInformations: ContactInformation;
};

export type GeneralInformation = {
  livingIn?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  relationShip?: RelationShip | null;
  gender?: Gender | null;
};

export type ContactInformation = {
  email?: string;
  cellphone?: string;
  phone?: string;
  instagram?: string;
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
