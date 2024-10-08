import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar.jsx";
import { Balance } from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";
import axios from "axios";

const Dashboard = () => {
  const [value, setValue] = useState(0)
  useEffect(()=>{
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res)=>{
        setValue(res.data.balance)
      })
  },[])

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={value} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
