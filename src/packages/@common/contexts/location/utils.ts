import path from "path-browserify";
import { matchPath } from "react-router-dom";
import { Location } from "./model";

// 対象ツリー上の子孫を走査して絶対パスに変換した1次元リストを返す
export const serializeTreeAsLocations = (
  tree: Location,
  parentPath?: string
): Location[] => {
  const absolutePath = path.join(parentPath || "", tree.path);
  const branch = tree?.nodes || [];

  return branch.reduce(
    (acc, node) => acc.concat(serializeTreeAsLocations(node, absolutePath)),
    [{ ...tree, path: absolutePath }]
  );
};

// 対象ツリー上の子孫を走査して、指定したノードを含むパスのリストを返す
export const extractLocationPathsFromTree = (
  tree: Location,
  nodeId: Location["id"]
): Location[] => {
  return serializeTreeAsLocations(tree).filter((l) => hasAncestor(l, nodeId));
};

export const hasAncestor = (
  site: Location,
  nodeId: Location["id"]
): boolean => {
  // 自分自身は子孫と見做す
  if (site.id === nodeId) {
    return true;
  }
  const branch = site?.nodes || [];
  return branch.some((node) => hasAncestor(node, nodeId));
};

export const detectLocation = (path: string, nodes: Location[]) => {
  return nodes.find((node) => matchPath(path, node.path)) || null;
};
