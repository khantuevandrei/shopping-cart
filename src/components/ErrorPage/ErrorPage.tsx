import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <>
      <h1>This page does not exist</h1>
      <Link to="/">Go back to the Home Page</Link>
    </>
  );
}
