import { Gender, RelationShip, type User } from "./types";

export const useUsersStore = defineStore("usersList", () => {
  const usersLists = ref<User[]>([
    {
      id: 1,
      userName: "johndoe",
      name: "John Doe",
      description: "Vivamus et vehicula nunc!!",
      photo: "johndoe.svg",
      backgroundPhoto: "pattern_lines.png",
      followersIds: [2, 3, 4, 5, 6],
      followingIds: [2, 5, 6],
      isFollowing: false,
      generalInformations: {
        livingIn: "United States",
        placeOfBirth: "United States",
        dateOfBirth: "1995-10-02",
        relationShip: RelationShip.Single,
        gender: Gender.Male,
      },
    },
    {
      id: 2,
      userName: "amylee",
      name: "Amy Lee",
      description:
        "Aenean nec est gravida, placerat lorem id, semper nibh. Vivamus et vehicula nunc",
      photo: "amy.svg",
      backgroundPhoto: "pattern_japanese.png",
      followersIds: [1, 8],
      followingIds: [1, 6, 4],
      isFollowing: false,
      generalInformations: {
        livingIn: "Brazil",
        placeOfBirth: "Brazil",
        dateOfBirth: "1996-05-07",
        relationShip: RelationShip.Single,
        gender: Gender.Female,
      },
    },
    {
      id: 3,
      userName: "kateoliver",
      name: "Kate Oliver",
      description:
        "am ut erat augue. Aenean eleifend magna pulvinar libero faucibus porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photo: "kate.svg",
      backgroundPhoto: "",
      followersIds: [],
      followingIds: [1],
      isFollowing: false,
      generalInformations: {},
    },
    {
      id: 4,
      userName: "peterjackson",
      name: "Peter Jackson",
      description: "Integer molestie posuere justo",
      photo: "peter.svg",
      backgroundPhoto: "pattern_bricks.png",
      followersIds: [2],
      followingIds: [1],
      isFollowing: false,
      generalInformations: {},
    },
    {
      id: 5,
      userName: "matthew124",
      name: "Matthew Taylor",
      description:
        "Phasellus malesuada lectus vitae massa feugiat auctor. Proin imperdiet eros ac mi sodales pharetra. Integer mattis volutpat semper. Nunc quis leo in sem aliquam malesuada imperdiet et lacus. Morbi rhoncus, justo et volutpat tempus, metus ante lacinia nisi, tempor mollis augue neque sed ante. In hac habitasse platea dictumst...",
      photo: "matthew.svg",
      backgroundPhoto: "",
      followersIds: [1, 6],
      followingIds: [],
      isFollowing: false,
      generalInformations: {},
    },
    {
      id: 6,
      userName: "barbie_smith",
      name: "Barbara Smith",
      description: "",
      photo: "barbara.svg",
      backgroundPhoto: "pattern_flower.png",
      followersIds: [1, 2, 8],
      followingIds: [5, 7],
      isFollowing: false,
      generalInformations: {
        dateOfBirth: "2000-02-02",
        relationShip: RelationShip.InARelationShip,
        gender: Gender.Female,
      },
    },
    {
      id: 7,
      userName: "robwill",
      name: "Robert Williams",
      description: "Fusce quis efficitur arcu, non placerat felis",
      photo: "robert.svg",
      backgroundPhoto: "pattern_geometric.png",
      followersIds: [6],
      followingIds: [8],
      isFollowing: false,
      generalInformations: {
        dateOfBirth: "1992-01-09",
        relationShip: RelationShip.Married,
        gender: Gender.Male,
      },
    },
    {
      id: 8,
      userName: "linda7",
      name: "Linda Collins",
      description: "",
      photo: "linda.svg",
      backgroundPhoto: "pattern_plaid.png",
      followersIds: [7],
      followingIds: [2, 6],
      isFollowing: false,
      generalInformations: {},
    },
  ]);

  const recommendedUsersIds = ref([4, 5, 6]);

  const recommendedUsers = computed<User[]>(() => {
    return getUsersByIds(recommendedUsersIds.value);
  });

  function getUserById(userId: number | string) {
    return usersLists.value.find((user) => user.id === Number(userId));
  }

  function getUsersByIds(ids: number[]): User[] {
    return usersLists.value.filter((user: User) => ids.includes(user.id));
  }

  function searchUsers(search: string, list?: User[]): User[] {
    return (list || usersLists.value).filter(
      (user: User) =>
        user.name.toLowerCase().trim().includes(search.trim().toLowerCase()) ||
        user.userName.toLowerCase().trim().includes(search.trim().toLowerCase())
    );
  }

  return {
    usersLists,
    getUserById,
    recommendedUsers,
    getUsersByIds,
    searchUsers,
  };
});
