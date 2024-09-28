import type { User } from "./types";

export const useUsersStore = defineStore("usersList", () => {
  const usersLists = ref<User[]>([
    {
      id: 1,
      userName: "johndoe",
      name: "John Doe",
      description: "Vivamus et vehicula nunc!!",
      photo: "johndoe.svg",
      backgroundPhoto: "",
      followersIds: [2, 3, 4, 5, 6],
      followingIds: [2],
      isFollowing: false,
    },
    {
      id: 2,
      userName: "amylee",
      name: "Amy Lee",
      description:
        "Aenean nec est gravida, placerat lorem id, semper nibh. Vivamus et vehicula nunc",
      photo: "amy.svg",
      backgroundPhoto: "",
      followersIds: [1, 8],
      followingIds: [1, 6, 4],
      isFollowing: false,
    },
    {
      id: 3,
      userName: "kateoliver",
      name: "Kate Oliver",
      description: "",
      photo: "kate.svg",
      backgroundPhoto: "",
      followersIds: [],
      followingIds: [1],
      isFollowing: false,
    },
    {
      id: 4,
      userName: "peterjackson",
      name: "Peter Jackson",
      description: "",
      photo: "peter.svg",
      backgroundPhoto: "",
      followersIds: [2],
      followingIds: [1],
      isFollowing: false,
    },
    {
      id: 5,
      userName: "matthew124",
      name: "Matthew Taylor",
      description: "",
      photo: "matthew.svg",
      backgroundPhoto: "",
      followersIds: [1, 6],
      followingIds: [],
      isFollowing: false,
    },
    {
      id: 6,
      userName: "barbie_smith",
      name: "Barbara Smith",
      description: "",
      photo: "barbara.svg",
      backgroundPhoto: "",
      followersIds: [1, 2, 8],
      followingIds: [5, 7],
      isFollowing: false,
    },
    {
      id: 7,
      userName: "robwill",
      name: "Robert Williams",
      description: "",
      photo: "robert.svg",
      backgroundPhoto: "",
      followersIds: [6],
      followingIds: [8],
      isFollowing: false,
    },
    {
      id: 8,
      userName: "linda7",
      name: "Linda Collins",
      description: "",
      photo: "linda.svg",
      backgroundPhoto: "",
      followersIds: [7],
      followingIds: [2, 6],
      isFollowing: false,
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

  function searchUsers(search: string): User[] {
    return usersLists.value.filter(
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
