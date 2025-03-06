import React from "react";
import "./modal.css";
import { FaRegWindowClose } from "react-icons/fa";

export default function Modal({ close }) {
  return (
    <>
      <div className="modal">
        <FaRegWindowClose className="close" onClick={() => close()} />
        <label>Loja:</label>
        <label>Local:</label>
        <label>Medição atual:</label>
        <label>Medição anterior:</label>
        <label>data:</label>
      </div>
    </>
  );
}
