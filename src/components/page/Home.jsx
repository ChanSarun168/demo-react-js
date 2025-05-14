// import SearchInput from "./components/SearchInput";
import { SingleChoiceChip, MultiChoiceChip } from "../ChoiceChip";
import { ToastProvider, useToast } from "../Toast";
import Dropdown from "../Dropdown";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { BiPlus, BiDownvote, BiSync } from "react-icons/bi";
import { useState } from "react";
import FlexleftOverlay from "../FlexleftOverlay";

const Home = () => {
  const { showToast } = useToast();
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="w-full bg-white p-3">
          {/* Add Button */}
          <div className="w-[95%] flex justify-end mb-5 gap-3">
            <button
              className="px-5 py-2 bg-blue-500 flex items-center gap-4 font-semibold text-white"
              onClick={() => setShowOverlay(true)}
            >
              <BiPlus /> Add
            </button>
            <button className="px-3 py-2 bg-gray-400">
              <BiDownvote />
            </button>
            <button className="px-3 py-2 bg-gray-400">
              <BiSync />
            </button>
          </div>
          {/* table */}
          <div className="relative overflow-x-auto flex justify-center">
            <table className="w-[95%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                  <td className="flex gap-3 justify-center items-center py-2">
                    <button
                      onClick={() => console.log("View clicked")}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => console.log("Edit clicked")}
                      className="p-2 text-yellow-500 hover:text-yellow-700"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => console.log("Delete clicked")}
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FlexleftOverlay
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        title="Add Product"
      >
        <form className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter price"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setShowOverlay(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </FlexleftOverlay>
    </>
  );
};
export default Home;
