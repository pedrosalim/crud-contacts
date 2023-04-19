import ButtonAddContact from "../Button/ButtonAddContact";
import { fetchContacts } from "../../api/contacts";
import useToggle from "@/hooks/useToggle";
import ModalDelete from "../ModalDelete";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Contact } from "@/interfaces";
import ModalEdit from "../ModalEdit";

export default function Table() {
  const [openDeletetModal, toggleModalDelete] = useToggle();
  const [openEditModal, toggleModal] = useToggle();

  const [contact, setContact] = useState({} as Contact);
  const [search, setSearch] = useState("");

  const { isLoading, data: contacts } = useQuery({
    queryKey: ["contacts", search],
    keepPreviousData: true,
    queryFn: () => fetchContacts(search),
  });

  if (isLoading) {
    return (
      <div>
        <text>Carregando</text>
      </div>
    );
  }

  function handleEditContact(contact: Contact) {
    setContact(contact);
    toggleModal();
  }

  function handleDeleteContact(contact: Contact) {
    setContact(contact);
    toggleModalDelete();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="h-full">
      <div className="p-2 flex-col ">
        <ButtonAddContact />
        <input
          type="text"
          placeholder="Buscar"
          onChange={handleChange}
          value={search}
          className="border-b-2 border-black h-[30px] w-[500px]"
        />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                {contacts?.map((contact) => (
                  <tbody key={contact.id} className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {contact?.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {contact?.name}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {contact?.phones[0]?.phone}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="text-green-500 hover:text-green-700"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteContact(contact)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
        <div>
          <ModalEdit
            contact={contact}
            visible={openEditModal}
            onClose={toggleModal}
          />
        </div>
      </div>
      <ModalDelete
        contact={contact}
        visible={openDeletetModal}
        onClose={toggleModalDelete}
      />
    </div>
  );
}
