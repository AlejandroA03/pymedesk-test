"use client";
import registerClient from "@/helpers/registerClient";
import { useState } from "react";
import { IClient } from "@/helpers/types";
import { ChangeEvent } from "react";
import Swal from "sweetalert2";
const FormClient: React.FC = (): React.ReactElement => {
  const [data, setData] = useState<IClient>({
    id: 0,
    name: "",
    address: "",
    cellphone: "",
    email: "",
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await registerClient(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cliente registrado correctamente!",
      showConfirmButton: true,
    }).then(() => location.reload());
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="bg-white p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-row items-center max-[1000px]:flex-col">
            <div className="flex flex-col items-center">
              <h2 className="text-[#202122] text-xl text-center px-8 max-md:text-[20px] m-3">
                Registrar cliente
              </h2>
              <div className="grid grid-cols-2 max-md:grid-cols-1">
                <div className="flex flex-col items-center mx-5 my-1">
                  <label className="w-[256px] text-[#384B59]">Nombre:</label>
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
                  <label className="w-[256px] text-[#384B59]">Dirección:</label>
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
                  <label className="w-[256px] text-[#384B59]">Teléfono:</label>
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
              className="bg-blue-700 text-white py-2 px-4 rounded-[10px]"
              disabled={
                data.name === "" ||
                data.email === "" ||
                data.address === "" ||
                data.cellphone === ""
              }
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormClient;
