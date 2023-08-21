import { withAuth } from "../wrappers/WithAuth";

export const Home = withAuth(() => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
});
