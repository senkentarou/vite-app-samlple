export const GNAVI_THEME = "gnavi" as const;

type Theme = typeof GNAVI_THEME;

export type Location = {
  id: string;
  path: string;
  theme?: Theme; // global: グロナビ
  nodes?: Location[]; // nodesを持たない場合は終端(leaf)と見做す
};
