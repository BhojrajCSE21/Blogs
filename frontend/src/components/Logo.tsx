import { RoughNotation } from "react-rough-notation";
import { useNavigate } from "react-router-dom";
import { LogoProps } from "./types";

export const Logo = ({ textSize, animationDelay }: LogoProps): JSX.Element => {
  const navigate = useNavigate();

  const navigateToHomeOnClick = () => {
    navigate("/");
  };

  return (
    <div
      className={`font-logo font-700 text-darkpurple ${textSize} p-1 italic hover:cursor-pointer`}
      onClick={navigateToHomeOnClick}
    >
      <RoughNotation
        type="highlight"
        show={false}
        
        animationDelay={animationDelay}
      >
        <img src={require("../assets/icons/main.png")} className="h-[4.5rem]"></img>
      </RoughNotation>
    </div>
  );
};
