import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Search = (): JSX.Element => {
  const inputRef = useRef<any>();

  const navigate = useNavigate();

  const searchOnClick = () => {
    const title = inputRef.current.value;
    navigate(`/search?title=${title}`);
  };

  return (
    <div className="flex items-center justify-center w-[60%] sm:w-[32%] bg-white/80 rounded-full shadow-md border border-[#445046] focus-within:border-[#445046] transition-all duration-200">
      <input
        type="text"
        placeholder="Search..."
        ref={inputRef}
        className="rounded-full text-sm w-full px-4 py-2 bg-transparent focus:outline-none text-[#445046] placeholder-[#445046]"
      />
      <button
        onClick={searchOnClick}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#445046] text-white hover:from-[#445046] hover:to-[#9dd5ca] transition-all duration-200 ml-1"
        aria-label="Search"
      >
        <AiOutlineSearch className="w-5 h-5" />
      </button>
    </div>
  );
};
