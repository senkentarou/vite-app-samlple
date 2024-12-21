export type Location = {
  id: string;
  path: string;
  nodes?: Location[]; // nodesを持たない場合は終端(leaf)と見做す
};
