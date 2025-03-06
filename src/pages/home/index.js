import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { Content } from "../../styles";

import "./home.css";
import Title from "../../components/Title";

export default function Home() {
  const navigate = useNavigate();
  function handleLink(e) {
    const path = e.currentTarget.getAttribute("data-path");
    navigate(`/${path}`);
  }
  return (
    <>
      <Header />
      <Title name="Complexo" />
      <Content>
        <div className="divLocal">
          <div
            className="shop"
            data-path="shop"
            onClick={(e) => {
              handleLink(e);
            }}
          >
            {" "}
          </div>
          <h2>Shopping Colinas</h2>
        </div>

        <div className="divLocal">
          <div
            className="torre"
            data-path="greentower"
            onClick={(e) => {
              handleLink(e);
            }}
          >
            {" "}
          </div>
          <h2>Green Tower</h2>
        </div>
      </Content>
    </>
  );
}
