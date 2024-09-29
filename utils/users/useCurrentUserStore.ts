import type { User } from "./types";
import { useUsersStore } from "./useUsersStore";

export const useCurrentUserStore = defineStore("currentUser", () => {
  const { usersLists } = useUsersStore();
  const currentUser = ref({
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
