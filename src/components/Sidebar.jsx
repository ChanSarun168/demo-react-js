import { useState } from "react";
import { FaBars, FaHome, FaUser, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Category", icon: <FaUser />, path: "/category" },
    { name: "Product", icon: <FaCog />, path: "/product" },
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen p-4 pt-6 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <div className="flex justify-end">
        <button onClick={toggleSidebar}>
          <FaBars className="text-white text-2xl" />
        </button>
      </div>

      <div className="mt-6 mb-10 flex items-center space-x-2 px-2">
        <div className="text-2xl font-bold">
          {isOpen ? "MyApp" : "M"}
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-gray-700"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
