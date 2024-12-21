import { Location } from "@common/location";

export const sitetree: Location = {
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
