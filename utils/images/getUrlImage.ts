export const getBackgroundgUrl = (img: string) =>
  new URL(`../../assets/background/${img}`, import.meta.url).href;

export const getImgUrl = (img?: string) =>
  new URL(`../../assets/avatar/${img}`, import.meta.url).href;
