import React, { useEffect, useState } from "react";
import axios from "axios";

import Filter from "../Filter/Filter";
import List from "../List/List";

import { TbCircleDotted } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { MdLowPriority } from "react-icons/md";
import { MdPriorityHigh } from "react-icons/md";

import "./DashboardStyle.css";

const Dashboard = () => {
  const StatusList = [
    { id: 1, name: "Backlog", icon: <TbCircleDotted color="grey" /> },
    { id: 3, name: "Todo", icon: <FaRegCircle color="black" /> },
    { id: 3, name: "In progress", icon: <FaCircleHalfStroke color="orange" /> },
    { id: 4, name: "Done", icon: <FaCheckCircle color="green" /> },
    { id: 5, name: "Canceled", icon: <FaTimesCircle color="darkred" /> },
  ];
  const PriorityList = [
    { id: 0, name: "No Priority", icon: <MdLowPriority color="black" /> },
    { id: 4, name: "Urgent", icon: <FcHighPriority color="red" /> },
    { id: 3, name: "High", icon: <MdPriorityHigh color="purple" /> },
    { id: 2, name: "Medium", icon: <FcMediumPriority color="orange" /> },
    { id: 1, name: "Low", icon: <FcLowPriority color="green" /> },
  ];
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [groupValue, setGroupValue] = useState(
    localStorage.getItem("groupValue") || "status"
  );
  const [orderValue, setOrderValue] = useState(
    localStorage.getItem("orderValue") || "priority"
  );
  const [userList, setUserList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const fetchData = () => {
    setLoading(true);
    const serviceUrl =
      "https://api.quicksell.co/v1/internal/frontend-assignment";
    axios
      .get(serviceUrl)
      .then((resp) => {
        localStorage.setItem("userList", JSON.stringify(resp.data.users));
        setData(resp.data.tickets);
        setUserList(resp.data.users);
        createList(groupValue);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const createList = (val) => {
    switch (val) {
      case "status":
        setDisplayList(StatusList);
        break;
      case "users":
        localStorage.setItem("displayList", JSON.stringify(userList));
        const isUserList = localStorage.getItem("userList");
        const currList = isUserList ? JSON.parse(isUserList) : userList;
        setDisplayList(currList);
        break;
      case "priority":
        setDisplayList(PriorityList);
        break;
      default:
        break;
    }
  };

  const handleGroupChange = (val) => {
    localStorage.setItem("groupValue", val);
    createList(val);
    setGroupValue(val);
  };

  const handleSortChange = (val) => {
    localStorage.setItem("orderValue", val);
    setOrderValue(val);
  };

  const Spinner = () => {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  };

  return (
    <div className="kanban-dashboard">
      <Filter
        handleGroupChange={handleGroupChange}
        handleSortChange={handleSortChange}
        groupValue={groupValue}
        orderValue={orderValue}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <List
          listData={displayList}
          ticketsData={data}
          groupValue={groupValue}
          orderValue={orderValue}
        />
      )}
    </div>
  );
};

export default Dashboard;
