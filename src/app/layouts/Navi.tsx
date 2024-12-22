import { useCallback, useMemo } from "react";

import { useLocationContext } from "@contexts/location";
import { GlobalNavi } from "@freee_jp/vibes";
import { MdHome, MdRouter } from "react-icons/md";

export const Navi = () => {
  const { state, computed } = useLocationContext();

  const showNaviOn = useCallback(
    (path: string) => {
      // 現在位置が属するグロナビが選択されている状態を指す。
      return computed.currentPaths.some((p) => p.path === path);
    },
    [computed.currentPaths]
  );

  const links = useMemo(() => {
    return [
      {
        title: "Home",
        url: "/",
        IconComponent: MdHome,
        current: state.current?.path === "/", // HOMEからドリルダウンするページを作らない。
      },
      {
        title: "About",
        url: "/about",
        IconComponent: MdRouter,
        current: showNaviOn("/about"),
      },
    ];
  }, [state, showNaviOn]);

  return <GlobalNavi hideHelpForm links={links} />;
};
