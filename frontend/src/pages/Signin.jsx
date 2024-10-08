import { BottomWarning } from "../components/ButtonWarning.jsx";
import { Button } from "../components/Button.jsx";
import { Heading } from "../components/Heading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signin`,
        {
          userName,
          password,
        }
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your credentials to access your account
          </div>

          <InputBox
            onPress={(e) => setUserName(e.target.value)}
            placeholder="username"
            label={"Username"}
          />
          <InputBox
            onPress={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleSignIn} />
          </div>
          <p className="text-xs text-red-700">{message}</p>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
