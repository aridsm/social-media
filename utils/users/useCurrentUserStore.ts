import { Gender, RelationShip, type User } from "./types";
import { useUsersStore } from "./useUsersStore";

export const useCurrentUserStore = defineStore("currentUser", () => {
  const { usersLists } = useUsersStore();
  const currentUser = ref<User>({
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
  });

  function editUser(newData: User) {
    Object.assign(currentUser.value, newData);

    const user = usersLists.find((u) => u.id === currentUser.value.id);

    if (user) {
      Object.assign(user, newData);
    }
  }

  return { currentUser, editUser };
});
