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
import { redirect, useLocation } from "react-router-dom";
import { Location } from "./model";
import {
  detectLocation,
  extractLocationPathsFromTree,
  serializeTreeAsLocations,
} from "./utils";

type State = {
  tree: Location;
  current: Location | null; // 現在のページ位置情報
};

type Computed = {
  treeNodes: Location[]; // ツリー上の全てのノードを走査して絶対パスに変換した1次元リスト
  currentPaths: Location[]; // 現在のページを構成するパスのリスト
  breadcrumbsLinks: { title: string; url?: string }[];
};

type Action = {
  updateCurrent: (path: string) => void;
  moveTo: (nodeId: Location["id"]) => void;
};

type Context = { state: State; computed: Computed; action: Action };

type Mutation = { type: "SET_LOCATION"; payload: Location | null };

const reducer: Reducer<State, Mutation> = (state, mutation) => {
  switch (mutation.type) {
    case "SET_LOCATION":
      return { ...state, current: mutation.payload };
    default:
      return state;
  }
};

const useComputed = (state: State) => {
  const currentPaths = useMemo(() => {
    if (!state.current) {
      return [];
    }
    return extractLocationPathsFromTree(state.tree, state.current.id);
  }, [state]);

  const breadcrumbsLinks = useMemo(() => {
    return currentPaths.map((path) => {
      // 当該ページの場合はリンクを表示しない
      if (path.id === state.current?.id) {
        return { title: path.id };
      }
      return { title: path.id, url: path.path };
    });
  }, [currentPaths]);

  return {
    treeNodes: useMemo(
      () => serializeTreeAsLocations(state.tree),
      [state.tree]
    ),
    currentPaths,
    breadcrumbsLinks,
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
  tree,
}: {
  children?: ReactNode;
  tree?: Location;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    tree: tree || { id: "HOME", path: "/" },
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
