import { Gender, RelationShip, type User } from "./types";
import { useCurrentUserStore } from "./useCurrentUserStore";

export const useUsersStore = defineStore("usersList", () => {
  const usersLists = ref<User[]>([
    {
      id: 1,
      userName: "johndoe",
      name: "John Doe",
      description: "Vivamus et vehicula nunc!!",
      photo: "johndoe.svg",
      backgroundPhoto: "pattern_plus.png",
      followersIds: [2, 3, 4, 5, 6],
      followingIds: [2, 5, 6, 9],
      isFollowing: true,
      online: true,
      generalInformations: {
        livingIn: "United States",
        placeOfBirth: "United States",
        dateOfBirth: "1995-10-02",
        relationShip: RelationShip.Single,
        gender: Gender.Male,
      },
      contactInformations: {
        cellphone: "",
        phone: "",
        email: "john_doe@email.com",
        instagram: "@johndoe9183932",
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
      followersIds: [1, 8, 9],
      followingIds: [1, 6, 4, 9],
      isFollowing: false,
      online: true,
      generalInformations: {
        livingIn: "Brazil",
        placeOfBirth: "Brazil",
        dateOfBirth: "2024-10-05",
        relationShip: RelationShip.Single,
        gender: Gender.Female,
      },
      contactInformations: {
        cellphone: "",
        phone: "00 1200 9009",
        email: "amylee@email.com",
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
      online: true,
      generalInformations: {},
      contactInformations: {
        cellphone: "00 98000 11111",
      },
    },
    {
      id: 4,
      userName: "peterjackson",
      name: "Peter Jackson",
      description: "Integer molestie posuere justo",
      photo: "peter.svg",
      backgroundPhoto: "pattern_bricks.png",
      followersIds: [2, 9],
      followingIds: [1, 9],
      isFollowing: true,
      online: false,
      generalInformations: {},
      contactInformations: {
        email: "peterjack@email.com",
      },
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
      online: true,
      generalInformations: {},
      contactInformations: {},
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
      isFollowing: true,
      online: false,
      generalInformations: {
        dateOfBirth: "2000-02-02",
        relationShip: RelationShip.InARelationShip,
        gender: Gender.Female,
      },
      contactInformations: {},
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
      online: false,
      generalInformations: {
        dateOfBirth: "1992-01-09",
        relationShip: RelationShip.Married,
        gender: Gender.Male,
      },
      contactInformations: {},
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
      online: false,
      generalInformations: {},
      contactInformations: {
        cellphone: "00 98200 11011",
        instagram: "@lindacollinns0023",
      },
    },
    {
      id: 9,
      userName: "j0sh81",
      name: "Josh Brown",
      description: "",
      photo: "josh.svg",
      backgroundPhoto: "pattern_new.png",
      followersIds: [1, 2, 4],
      followingIds: [2, 4],
      isFollowing: true,
      online: true,
      generalInformations: {
        dateOfBirth: "1995-12-09",
        relationShip: RelationShip.Single,
        gender: Gender.Male,
        livingIn: "United Kingdom",
        placeOfBirth: "United Kingdom",
      },
      contactInformations: {
        instagram: "@joshbrown82_728",
      },
    },
  ]);

  const recommendedUsersIds = ref([3, 5, 8]);

  const recommendedUsers = computed<User[]>(() => {
    return getUsersByIds(recommendedUsersIds.value);
  });

  const friendsOnline = computed<User[]>(() => {
    return usersLists.value.filter((user) => user.online && user.isFollowing);
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

  function toggleFollowUser(userId: number) {
    const { currentUser, editUser } = useCurrentUserStore();

    const user = getUserById(userId);
    const currentUserUser = getUserById(currentUser?.id);

    if (user && currentUserUser) {
      user.isFollowing = !user.isFollowing;

      if (user.isFollowing) {
        console.log(currentUserUser.followingIds);

        currentUserUser.followingIds.push(userId);
        user.followersIds.push(currentUser.id);

        editUser(currentUserUser);
        console.log(currentUserUser.followingIds);
      } else {
        currentUserUser.followingIds = currentUser.followingIds.filter(
          (followingId) => followingId !== userId
        );

        user.followersIds = user.followersIds.filter(
          (followerId) => followerId !== currentUser.id
        );

        editUser(currentUserUser);
      }
    }
  }

  return {
    usersLists,
    getUserById,
    recommendedUsers,
    getUsersByIds,
    searchUsers,
    toggleFollowUser,
    friendsOnline,
  };
});
