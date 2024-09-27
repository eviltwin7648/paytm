import { BottomWarning } from "../components/ButtonWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axois from "axios";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSingUp = async () => {
    try {
      const resposne = await axois.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
        {
          userName,
          password,
          firstName,
          lastName,
        }
      );

      localStorage.setItem("token", resposne.data.token);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onPress={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onPress={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onPress={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="johndoe@gmail.com"
            label={"Email"}
          />
          <InputBox
            onPress={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={handleSingUp} label={"Sign up"} />
          </div>
          <p className="text-xs text-red-700">{message}</p>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
