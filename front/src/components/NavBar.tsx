"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.jpg";
import Image from "next/image";

const links = [
  { name: "productos", text: "Productos", href: "/productos" },
  { name: "pedidos", text: "Pedidos", href: "/pedidos" },
  { name: "nuevoPedido", text: "Nuevo Pedido", href: "/nuevopedido" },
  { name: "clientes", text: "Clientes", href: "/clientes" },
  {
    name: "nuevoCleinte",
    text: "Registrar Cliente",
    href: "/registrarcliente",
  },
];

const NavBar: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav className="max-md:hidden">
      <div className="flex items-center justify-between flex-wrap bg-gray-600 p-1 px-5 drop-shadow-xl">
        <Link href="/">
          <Image src={logo} width="100" alt="logo" className=" rounded-full" />
        </Link>
        <ul>
          {links.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`p-6 hover:brightness-75

                        ${pathname === link.href ? "cursor-default brightness-75 disabled" : ""}`}
              >
                {link.text}
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
