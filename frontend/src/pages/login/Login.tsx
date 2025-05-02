import { Logo } from "../../components/Logo";
import { LoginForm } from "./components/LoginForm";

export const Login = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#9dd5ca]">
      <div className="flex flex-col items-center rounded-md p-2 w-[80%] sm:w-[40%] bg-white shadow-md shadow-[#9dd5ca] border border-[#9dd5ca]">
      <img src={require("../../assets/icons/main.png")} alt="logo" className="w-1/2 h-1/2" />
        <LoginForm />
      </div>
    </div>
  );
};
