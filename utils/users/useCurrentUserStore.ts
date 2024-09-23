export const useCurrentUserStore = defineStore("currentUser", () => {
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

  return { currentUser };
});
