import { Location, GNAVI_THEME } from "@contexts/location";

export const sitetree: Location = {
  id: "HOME",
  path: "/",
  theme: GNAVI_THEME,
  nodes: [
    {
      id: "ABOUT",
      path: "about",
      theme: GNAVI_THEME,
      nodes: [
        {
          id: "ABOUT.ME",
          path: "me",
        },
      ],
    },
  ],
};
