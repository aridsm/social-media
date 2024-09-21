export const useCurrentUserStore = defineStore("currentUser", () => {
  const currentUser = ref({
    id: 6,
    userName: "jenny",
    name: "Jennifer Oliver",
    description:
      "Aenean nec est gravida, placerat lorem id, semper nibh. Vivamus et vehicula nunc",
    photo: "",
    backgroundPhoto: "",
    followers: [],
    following: [],
    posts: [],
    generalInformations: {},
  });

  return { currentUser };
});
