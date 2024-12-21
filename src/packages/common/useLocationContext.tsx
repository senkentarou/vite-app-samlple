import path from "path-browserify";
import {
  createContext,
  useContext,
  useReducer,
  Reducer,
  Dispatch,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { redirect, matchPath, useLocation } from "react-router-dom";

// TODO: モデルを別ファイルに切り出す
type Location = {
  id: string;
  path: string;
  nodes?: Location[]; // nodesを持たない場合は終端(leaf)と見做す
};

type State = {
  tree: Location;
  current: Location | null; // 現在のページ位置情報
};

type Computed = {
  treeNodes: Location[]; // ツリー上の全てのノードを走査して絶対パスに変換した1次元リスト
  currentPaths: Location[]; // 現在のページを構成するパスのリスト
};

type Action = {
  updateCurrent: (path: string) => void;
  moveTo: (nodeId: Location["id"]) => void;
};

type Context = { state: State; computed: Computed; action: Action };

type Mutation = { type: "SET_LOCATION"; payload: Location | null };

// TODO: Treeは別ファイルで管理。
const initialTree: Location = {
  id: "HOME",
  path: "/",
  nodes: [
    {
      id: "ABOUT",
      path: "about",
      nodes: [
        {
          id: "ABOUT.ME",
          path: "me",
        },
      ],
    },
  ],
};

const reducer: Reducer<State, Mutation> = (state, mutation) => {
  switch (mutation.type) {
    case "SET_LOCATION":
      return { ...state, current: mutation.payload };
    default:
      return state;
  }
};

// TODO: 関数達を別ファイルに切り出す

// 対象ツリー上の子孫を走査して絶対パスに変換した1次元リストを返す
const serializeTreeAsLocations = (
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
const extractLocationPathsFromTree = (
  tree: Location,
  nodeId: Location["id"]
): Location[] => {
  return serializeTreeAsLocations(tree).filter((l) => hasAncestor(l, nodeId));
};

const hasAncestor = (site: Location, nodeId: Location["id"]): boolean => {
  // 自分自身は子孫と見做す
  if (site.id === nodeId) {
    return true;
  }
  const branch = site?.nodes || [];
  return branch.some((node) => hasAncestor(node, nodeId));
};

const detectLocation = (path: string, nodes: Location[]) => {
  return nodes.find((node) => matchPath(path, node.path)) || null;
};

const useComputed = (state: State) => {
  return {
    treeNodes: useMemo(
      () => serializeTreeAsLocations(state.tree),
      [state.tree]
    ),
    currentPaths: useMemo(() => {
      if (!state.current) {
        return [];
      }
      return extractLocationPathsFromTree(state.tree, state.current.id);
    }, [state]),
  };
};

const useAction = ({
  computed,
  dispatch,
}: {
  state: State;
  computed: Computed;
  dispatch: Dispatch<Mutation>;
}) => {
  return {
    updateCurrent: (path: string) => {
      dispatch({
        type: "SET_LOCATION",
        payload: detectLocation(path, computed.treeNodes),
      });
    },
    moveTo: (nodeId: Location["id"]) => {
      const node = computed.currentPaths.find((node) => node.id === nodeId);
      if (node) {
        redirect(node.path);
      }
    },
  };
};

const LocationContext = createContext<Context | null>(null);

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationContextProvider"
    );
  }
  return context;
};

export const LocationContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    tree: initialTree, // TODO: Providerのpropsで渡すようにする
    current: null,
  });
  const computed = useComputed(state);
  const action = useAction({ state, computed, dispatch });
  const { pathname } = useLocation();

  useEffect(() => action.updateCurrent(pathname), [pathname]);

  return (
    <LocationContext.Provider value={{ state, computed, action }}>
      {children}
    </LocationContext.Provider>
  );
};
