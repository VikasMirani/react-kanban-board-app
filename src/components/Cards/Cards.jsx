import React from "react";

import { FaCircle } from "react-icons/fa";

import './CardsStyle.css';

const Cards = (props) => {
  const { data } = {...props};
  return (
    <div className="kanban-cards">
      <li className="item-card">
        <div className="cardId">{data.id}</div>
        <div className="cardTitle">{data.title}</div>
        <div className="cardTag">
          <span className="tag-icon">
            <FaCircle color="grey" />
          </span>{" "}
          {data.tag[0]}
        </div>
      </li>
    </div>
  );
}

export default Cards;