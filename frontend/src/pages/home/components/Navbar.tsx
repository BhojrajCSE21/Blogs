import { Link } from "react-router-dom";
import { Logo } from "../../../components/Logo";
import { MobileNavbar } from "./MobileNavbar";
import { Search } from "./Search";
import { UserProfile } from "./UserProfile";

export const Navbar = (): JSX.Element => {
  const authToken = localStorage.getItem("authToken");

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-20 bg-gradient-to-r from-[#d6eae5] to-[#d6eae5] shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-[1080px] h-16 px-6">
        <Logo textSize="text-[1.5rem] sm:text-[2.5rem]" />
        <Search/>
        
        {/** Desktop navbar */}
        <nav className="hidden sm:block">
          <ul className="flex space-x-6 text-md items-center">
            {authToken ? (
              <UserProfile />
            ) : (
              <>
                <li className="bg-white text-[#445046] font-semibold p-2 rounded-full w-20 h-10 flex items-center justify-center shadow-md hover:bg-[#445046] hover:text-white hover:scale-105 transition-all duration-200">
                  <Link to="/login">Login</Link>
                </li>
                <li className="border-2 border-white text-white font-semibold p-2 rounded-full w-20 h-10 flex items-center justify-center bg-[#445046] hover:bg-white hover:text-[#445046] hover:scale-105 transition-all duration-200">
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <MobileNavbar />
      </div>
    </div>
  );
};
