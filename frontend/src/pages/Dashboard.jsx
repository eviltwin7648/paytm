import { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [value, setValue] = useState(0)
  useEffect(()=>{
      axios.get('http://localhost:3000/api/v1/account/balance',{
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
