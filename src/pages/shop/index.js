import React from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../styles";

import "./shop.css";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function Shop() {
  const navigate = useNavigate();
  function handleLink(e) {
    const path = e.currentTarget.getAttribute("data-path");
    navigate(`/shop/${path}`);
  }
  return (
    <>
      <Header />
      <Title name="Shopping" />
      <Content>
        <div className="divLocal">
          <div
            className="energia"
            data-path="energia"
            onClick={(e) => {
              handleLink(e);
            }}
          >
            {" "}
          </div>
          <h2>Energia</h2>
        </div>
        <div className="divLocal">
          <div
            className="agua"
            data-path="agua"
            onClick={(e) => {
              handleLink(e);
            }}
          >
            {" "}
          </div>
          <h2>Agua</h2>
        </div>
      </Content>
    </>
  );
}
