interface Phones {
  phone: string;
}

export interface Contact {
  id?: number;
  name: string;
  phones: Phones[];
  zipcode: string;
  street: string;
  street_number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}
