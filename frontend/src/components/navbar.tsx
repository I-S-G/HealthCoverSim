import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className="flex justify-center items-center px-4 sm:px-6 backdrop-blur-md bg-white py-6 shadow container mx-auto">
        <nav className="flex gap-x-8">
          <Link to={"/"}>Create</Link>
          <Link to={"/list"}>Quote List</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
