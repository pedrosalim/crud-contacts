import { Formik, ErrorMessage, Form, FieldArray } from "formik";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { createContact } from "@/api/contacts";

interface SelectValueZipcodeProps {
  street_number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

interface ModalAddProps {
  name?: string;
  phone?: string;
  selectValueZipcode?: SelectValueZipcodeProps;
  visible: boolean;
  onClose: () => void;
}

const initialValues = {
  name: "",
  phones: [
    {
      phone: "",
    },
  ],
  street_number: "",
  street: "",
  neighborhood: "",
  city: "",
  state: "",
  country: "",
  zipcode: "",
};

const scheme = Yup.object({
  name: Yup.string().required(),
  phone: Yup.string(),
});

export default function ModalAdd({
  name,
  phone,
  selectValueZipcode,
  visible,
  onClose,
  ...props
}: ModalAddProps) {
  // const [showModal, setShowModal] = React.useState(false);

  const queryClient = useQueryClient();

  const checkZipcode = (e: any, setFieldValue: any) => {
    const zip = e.target.value.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${zip}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue("neighborhood", data.bairro);
        setFieldValue("city", data.bairro);
        setFieldValue("street", data.logradouro);
        setFieldValue("state", data.uf);
      });
  };

  const addNewContact = useMutation(createContact);

  const handleSubmitForm = async (values: typeof initialValues) => {
    try {
      const contact = await addNewContact.mutateAsync(values);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      console.log(contact);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Ok");
    }

    console.log("SUBMIT", values);
    onClose();
  };
  return (
    <>
      {visible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Cadastrar novo contato
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    validationSchema={scheme}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      setFieldValue,
                    }) => (
                      <Form>
                        <div className="flex-col p-2">
                          <div className="p-2">
                            <input
                              type="text"
                              name="name"
                              placeholder="Nome"
                              onChange={handleChange}
                              value={values.name}
                              className="p-1 w-full rounded-lg border-2 border-solid border-black"
                            />
                            {errors.name && touched.name ? (
                              <div>{errors.name}</div>
                            ) : null}
                          </div>

                          <FieldArray name="phones">
                            {({ insert, remove, push }) => (
                              <div>
                                <div className="p-2">
                                  <button
                                    type="button"
                                    className="secondary bg-indigo-500 text-white p-2 w-1/3 rounded-lg"
                                    onClick={() => push({ phone: "" })}
                                  >
                                    Novo número
                                    <AddIcCallIcon />
                                  </button>
                                </div>
                                {values.phones.length > 0 &&
                                  values.phones.map((phone, index) => (
                                    <>
                                      <div className="flex" key={index}>
                                        <div className="p-2">
                                          <input
                                            type="text"
                                            name={`phones.${index}.phone`}
                                            placeholder="Telefone"
                                            onChange={handleChange}
                                            className="p-1 w-full rounded-lg border-2 border-solid border-black"
                                          />
                                          {errors.name && touched.name ? (
                                            <div>{errors.name}</div>
                                          ) : null}
                                        </div>

                                        <ErrorMessage
                                          name={`phones.${index}.phone`}
                                          component="div"
                                          className="field-error"
                                        />
                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => remove(index)}
                                          >
                                            <DeleteForeverIcon />
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                              </div>
                            )}
                          </FieldArray>

                          {/* FIELDS ZIPCODE */}
                          <div className="grid grid-cols-3">
                            <div className="p-2">
                              <input
                                type="text"
                                name="zipcode"
                                placeholder="CEP"
                                onChange={handleChange}
                                value={values.zipcode}
                                onBlur={(e) => checkZipcode(e, setFieldValue)}
                                className="p-1 rounded-lg border-2 border-solid border-black"
                              />
                              {errors.zipcode && touched.zipcode ? (
                                <div>{errors.zipcode}</div>
                              ) : null}
                            </div>

                            <div className="p-2 col-span-2">
                              <input
                                type="text"
                                name="street"
                                placeholder="Rua"
                                onChange={(date) =>
                                  setFieldValue("logradouro", date)
                                }
                                value={values.street}
                                className="p-1 rounded-lg w-full border-2 border-solid border-black"
                              />
                              {errors.street && touched.street ? (
                                <div>{errors.street}</div>
                              ) : null}
                            </div>

                            <div className="p-2">
                              <input
                                type="text"
                                name="street_number"
                                placeholder="Número da residencia"
                                onChange={handleChange}
                                value={values.street_number}
                                className="p-1 rounded-lg border-2 border-solid border-black"
                              />
                              {errors.street_number && touched.street_number ? (
                                <div>{errors.street_number}</div>
                              ) : null}
                            </div>

                            <div className="p-2">
                              <input
                                type="text"
                                name="neighborhood"
                                placeholder="Bairro"
                                onChange={handleChange}
                                value={values.neighborhood}
                                className="p-1 rounded-lg border-2 border-solid border-black"
                              />
                              {errors.neighborhood && touched.neighborhood ? (
                                <div>{errors.neighborhood}</div>
                              ) : null}
                            </div>

                            <div className="p-2">
                              <input
                                type="text"
                                name="city"
                                placeholder="Cidade"
                                onChange={handleChange}
                                value={values.city}
                                className="p-1 rounded-lg border-2 border-solid border-black"
                              />
                              {errors.city && touched.city ? (
                                <div>{errors.city}</div>
                              ) : null}
                            </div>

                            <div className="p-2">
                              <input
                                type="text"
                                name="state"
                                placeholder="Estado"
                                onChange={handleChange}
                                value={values.state}
                                className="p-1 rounded-lg border-2 border-solid border-black"
                              />
                              {errors.state && touched.state ? (
                                <div>{errors.state}</div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => onClose()}
                          >
                            Fechar
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleSubmit}
                          >
                            Cadastrar
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    Cadastrar
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
