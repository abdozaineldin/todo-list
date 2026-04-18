import { useState } from "react";

type Props = {
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

const Login: React.FC<Props> = ({ setEmail }) => {
  const [localEmail, setLocalEmail] = useState("");

  function handleLogin() {
    localStorage.setItem("email", localEmail);
    setEmail(localEmail);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalEmail(e.target.value);
  }

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <form action="">
        <div className="bg-gray-100 p-6 rounded-xl">
          <h1 className="text-center text-[#7f56da] text-[40px] font-bold mb-5">
            To Do List
          </h1>

          <h1 className="text-[#777] text-[16px] font-bold">Email</h1>
          <input
            type="email"
            placeholder="enter your email"
            value={localEmail}
            onChange={handleChange}
            className="w-full p-2 my-3 border rounded-xl border-[#999] outline-none focus:border-[#6d3dd4] focus:outline-none focus:ring-1 focus:ring-[#6d3dd4]"
          />

          <h1 className="text-[#777] text-[16px] font-bold">Password</h1>
          <input
            type="password"
            placeholder="enter password"
            // value=""
            className="w-full p-2 my-3 border rounded-xl border-[#999] outline-none focus:border-[#6d3dd4] focus:outline-none focus:ring-1 focus:ring-[#6d3dd4] box-border"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#7f56da] hover:bg-[#613db7] hover:cursor-pointer rounded-xl text-white p-2 my-3"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
