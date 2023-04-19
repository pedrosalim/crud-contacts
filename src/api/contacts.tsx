import { Contact } from "@/interfaces";

export async function fetchContacts(filter: string): Promise<Contact[]> {
  const response = await fetch(
    `http://localhost:3001/contacts?name_like=${filter}`
  );
  return response.json();
}

export async function fetchContact(id: number) {
  const response = await fetch(`http://localhost:3001/contacts/${id}`);
  return response.json();
}

export async function createContact(newContact: Omit<Contact, "id">) {
  const response = await fetch(`http://localhost:3001/contacts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newContact),
  });

  return response.json();
}

export async function updateContact(updateContact: Contact) {
  const response = await fetch(
    `http://localhost:3001/contacts/${updateContact.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateContact),
    }
  );

  return response.json();
}

export async function deleteContact(deleteContact: Contact) {
  const response = await fetch(
    `http://localhost:3001/contacts/${deleteContact.id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}
