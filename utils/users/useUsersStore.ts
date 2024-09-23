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
      followersIds: [],
      followingIds: [],
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
      followersIds: [],
      followingIds: [],
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
      followingIds: [],
      isFollowing: false,
    },
    {
      id: 4,
      userName: "peterjackson",
      name: "Peter Jackson",
      description: "",
      photo: "peter.svg",
      backgroundPhoto: "",
      followersIds: [],
      followingIds: [],
      isFollowing: false,
    },
    {
      id: 5,
      userName: "matthew124",
      name: "Matthew Taylor",
      description: "",
      photo: "matthew.svg",
      backgroundPhoto: "",
      followersIds: [],
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
      followersIds: [],
      followingIds: [],
      isFollowing: false,
    },
    {
      id: 7,
      userName: "robwill",
      name: "Robert Williams",
      description: "",
      photo: "robert.svg",
      backgroundPhoto: "",
      followersIds: [],
      followingIds: [],
      isFollowing: false,
    },
    {
      id: 8,
      userName: "linda7",
      name: "Linda Collins",
      description: "",
      photo: "linda.svg",
      backgroundPhoto: "",
      followersIds: [],
      followingIds: [],
      isFollowing: false,
    },
  ]);

  function getUserById(userId: number | string) {
    return usersLists.value.find((user) => user.id === Number(userId));
  }

  return { usersLists, getUserById };
});
