"use client";
import deleteClient from "@/helpers/deleteClient";
import getClients from "@/helpers/getClients";
import { IClient } from "@/helpers/types";
import updateClient from "@/helpers/updateClient";
import { ChangeEvent, useState, useEffect } from "react";

const TableClients: React.FC = (): React.ReactElement => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [modalOpenDelete, setModalOpenDelete] = useState({
    stateModal: false,
    clientId: 0,
  });
  const [modalOpenUpdate, setModalOpenUpdate] = useState({
    stateModal: false,
    client: { id: 0, name: "", address: "", cellphone: "", email: "" },
  });
  const [data, setData] = useState<IClient>({
    id: 0,
    name: "",
    address: "",
    cellphone: "",
    email: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      const clientsResponse = await getClients();
      setClients(clientsResponse);
    };
    fetchClients();
  }, []);

  const openModalDelete = (clientId: number) => {
    setModalOpenDelete({ stateModal: true, clientId });
  };

  const handleDelete = async (id: number) => {
    await deleteClient(id);
    setModalOpenDelete({ stateModal: false, clientId: 0 });
    location.reload();
  };

  const openModalUpdate = (client: IClient) => {
    setModalOpenUpdate({ stateModal: true, client });
    setData(client);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateClient(data);
    setModalOpenUpdate({
      stateModal: false,
      client: { id: 0, name: "", address: "", cellphone: "", email: "" },
    });
    location.reload();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <main className="flex flex-col">
      {modalOpenDelete.stateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl mb-4 text-black text-center">
              ¿Desea eliminar este cliente del registro?
            </h2>
            <button
              onClick={() => handleDelete(modalOpenDelete.clientId)}
              className="bg-blue-700 text-white py-2 px-4 rounded-[10px] hover:bg-orange-400"
            >
              Sí
            </button>
            <button
              onClick={() =>
                setModalOpenDelete({ stateModal: false, clientId: 0 })
              }
              className="bg-gray-500 text-white py-2 px-4 rounded-[10px] ml-2 hover:bg-red-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {modalOpenUpdate.stateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <form
              onSubmit={handleUpdate}
              className="flex flex-col items-center"
            >
              <div className="flex flex-row items-center max-[1000px]:flex-col">
                <div className="flex flex-col items-center">
                  <h2 className="text-[#202122] text-xl text-center px-8 max-md:text-[20px] m-3">
                    Actualizar datos
                  </h2>
                  <div className="grid grid-cols-2 max-md:grid-cols-1">
                    <div className="flex flex-col items-center mx-5 my-1">
                      <label className="w-[256px] text-[#384B59]">
                        Nombre:
                      </label>
                      <input
                        className="text-black h-[40px] w-[256px] rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-gray-700"
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="Nombre"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col items-center mx-5 my-1">
                      <label className="w-[256px] text-[#384B59]">Email:</label>
                      <input
                        className="text-black h-[40px] w-[256px] rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-gray-700"
                        type="text"
                        id="email"
                        name="email"
                        value={data.email}
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col items-center mx-5 my-1">
                      <label className="w-[256px] text-[#384B59]">
                        Dirección:
                      </label>
                      <input
                        className="text-black h-[40px] w-[256px] rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-gray-700"
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        placeholder="Dirección"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col items-center mx-5 my-1">
                      <label className="w-[256px] text-[#384B59]">
                        Teléfono:
                      </label>
                      <input
                        className="text-black h-[40px] w-[256px] rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-gray-700"
                        type="text"
                        id="cellphone"
                        name="cellphone"
                        value={data.cellphone}
                        placeholder="Teléfono"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-700 text-white py-2 px-4 rounded-[10px] hover:bg-orange-400"
                >
                  Actualizar datos
                </button>
                <button
                  onClick={() =>
                    setModalOpenUpdate({
                      stateModal: false,
                      client: {
                        id: 0,
                        name: "",
                        address: "",
                        cellphone: "",
                        email: "",
                      },
                    })
                  }
                  className="bg-gray-500 text-white py-2 px-4 rounded-[10px] ml-2 hover:bg-red-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div>
        <div className="m-auto my-5 relative flex flex-col w-4/5 h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="relative mx-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
            <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
              <div className="flex w-full gap-2 shrink-0 md:w-max"></div>
            </div>
          </div>
          <div className="p-3 px-0 overflow-scroll h-[600px]">
            <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] mr-[45px]">
              Clientes
            </h2>
            <table className="w-full mt-4 text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-bold leading-none">
                      Nombre
                    </p>
                  </th>
                  <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-bold leading-none">
                      Email
                    </p>
                  </th>
                  <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-bold leading-none">
                      Dirección
                    </p>
                  </th>
                  <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-bold leading-none">
                      Telefono
                    </p>
                  </th>
                  <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-bold leading-none">
                      Acciones
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client: IClient) => (
                  <tr key={client.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {client.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {client.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {client.address}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {client.cellphone}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-row">
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => openModalUpdate(client)}
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                            </svg>
                          </span>
                        </button>
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => openModalDelete(client.id)}
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg
                              className="text-gray-800 dark:text-red-600/60"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16.000000pt"
                              height="16.000000pt"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TableClients;
