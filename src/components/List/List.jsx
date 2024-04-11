import React from "react";

import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { HiMiniUserCircle } from "react-icons/hi2";

import Cards from "../Cards/Cards";

import "./ListStyle.css";

const List = (props) => {
  const { listData, ticketsData, groupValue, orderValue } = { ...props };

  const ListItem = (props) => {
    const { data } = { ...props };
    return (
      <>
        <li className="drag-column">
          <span className="header">
            <span className="item-l-icon">
              {data.icon || <HiMiniUserCircle color="black" />}
            </span>{" "}
            {data.name} <span className="item-count">{getCount(data)}</span>
            <span className="item-r-icons">
              <FaPlus /> <BsThreeDots />
            </span>
          </span>
          <div className="content">
            <ul className="item-list">{renderCards(data)}</ul>
          </div>
        </li>
      </>
    );
  };

  const getCount = (data) => {
    switch (groupValue) {
      case "status": {
        let list = ticketsData.filter((crd) => crd.status === data.name);
        return list.length;
        // eslint-disable-next-line
        break;
      }
      case "priority": {
        let list = ticketsData.filter((crd) => crd.priority === data.id);
        return list.length;
        // eslint-disable-next-line
        break;
      }
      case "users": {
        let list = ticketsData.filter((crd) => crd.userId === data.id);
        return list.length;
        // eslint-disable-next-line
        break;
      }
      default:
        break;
    }
  };

  const sortList = (list) => {
    if (orderValue === "priority") {
      list = list.sort(function (a, b) {
        return a.priority - b.priority;
      });
    } else if (orderValue === "title") {
      list = list.sort(function (a, b) {
        return a.id - b.id;
      });
    }
    return list;
  };

  const renderCards = (data) => {
    if (groupValue === "status") {
      let list = ticketsData.filter((crd) => crd.status === data.name);
      sortList(list);
      return (
        <>
          {list.map((crd) => {
            return <Cards key={crd.title} data={crd} />;
          })}
        </>
      );
    } else if (groupValue === "priority") {
      let list = ticketsData.filter((crd) => crd.priority === data.id);
      sortList(list);
      return (
        <>
          {list.map((crd) => {
            return <Cards key={crd.title} data={crd} />;
          })}
        </>
      );
    } else if (groupValue === "users") {
      let list = ticketsData.filter((crd) => crd.userId === data.id);
      sortList(list);
      return (
        <>
          {list.map((crd) => {
            return <Cards key={crd.title} data={crd} />;
          })}
        </>
      );
    }
  };

  return (
    <div className="kanban-list">
      <ul className="drag-list">
        {listData && listData.length
          ? listData.map((el) => {
              return <ListItem key={el.name} data={el} />;
            })
          : ""}
      </ul>
    </div>
  );
};

export default List;
