import { useState } from "react";

import Modal from "@/components/Modal";
import useToggle from "@/hooks/useToggle";
import { useMutation, useQueryClient } from "react-query";
import { createContact } from "@/api/contacts";
import { Contact } from "@/interfaces";
import ModalAdd from "@/components/ModalAdd";

function ButtonAddContact() {
  const [openModal, toggleModal] = useToggle();

  function handleAddContact() {
    toggleModal();
  }

  return (
    <div>
      <button onClick={() => handleAddContact()}>
        <div className="bg-indigo-500 mt-10 w-[260px] rounded-lg p-2 flex justify-center">
          <text className="text-white font-bold">NOVO CONTATO</text>
        </div>
      </button>

      <div>
        {/* <Modal visible={openModal} onClose={toggleModal} /> */}
        <ModalAdd visible={openModal} onClose={toggleModal} />
      </div>
    </div>
  );
}

export default ButtonAddContact;
