export interface Action {
  text: string;
  click: () => void;
  id: number | string;
  icon?: string;
  class?: string;
  visible?: () => boolean;
}
