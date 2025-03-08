import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
export default function ModalEdit({ close }) {
  return (
    <>
      <div className="modal">
        <FaRegWindowClose className="close" onClick={() => close()} />
        <h1>modal edit</h1>
      </div>
    </>
  );
}
