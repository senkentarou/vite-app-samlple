import { useLocationContext } from "@common/location";
import { Breadcrumbs } from "@freee_jp/vibes";

export const Me = () => {
  const { computed } = useLocationContext();

  return (
    <>
      <Breadcrumbs links={computed.breadcrumbsLinks} />
      <div>
        <h1>Me</h1>
        <p>This is the me page.</p>
      </div>
    </>
  );
};
