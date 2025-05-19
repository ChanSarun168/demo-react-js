import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { BiPlus, BiDownvote, BiSync } from "react-icons/bi";
import axios from "axios";
import { useToast } from "../Toast";
import FlexleftOverlay from "../FlexleftOverlay";
import { SingleChoiceChip } from "../ChoiceChip";
import CategoryDetail from "./CategoryDetail";
import ConfirmModal from "../ConfirmModal";

const Category = () => {
  const { showToast } = useToast();

  // Overlay visibility states
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Data states
  const [category, setCategory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState({ name: "", is_active: "active" }); // for Add/Edit form
  const [dataDetail, setDataDetail] = useState(null); // for detail view
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch all categories
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category");
      setCategory(response.data.data);
    } catch (error) {
      console.log("error: ", error);
      showToast("Failed to fetch categories", error);
    }
  };

  // Fetch detail by ID (for detail view or edit)
  const fetchDataDetail = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/category/${id}`
      );
      setDataDetail(response.data.data);
      setData({
        name: response.data.data.name,
        is_active: response.data.data.is_active,
      });
    } catch (error) {
      console.log("error: ", error);
      showToast("Failed to fetch category detail", error);
    }
  };

  // Delete function
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/category/${deleteId}`);
      showToast("Category deleted successfully");
      fetchData();
    } catch (error) {
      console.error(error);
      showToast("Failed to delete category", error);
    }
  };

  // Add new category
  const handleAddSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/category",
        data
      );
      showToast(response.data.message || "Category created successfully");
      setShowAddOverlay(false);
      fetchData();
      setData({ name: "", is_active: "active" });
    } catch (error) {
      console.log("error: ", error);
      showToast("Failed to add category", error);
    }
  };

  // Update existing category
  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/category/${selectedId}`,
        data
      );
      showToast(response.data.message || "Category updated successfully");
      setShowEditOverlay(false);
      fetchData();
      setData({ name: "", is_active: "active" });
      setDataDetail(null);
      setSelectedId(null);
    } catch (error) {
      console.log("error: ", error);
      showToast("Failed to update category", error);
    }
  };

  // Refresh categories list
  const refreshData = async (e) => {
    e.preventDefault();
    fetchData();
  };

  // Handle clicking Edit: fetch detail, open edit overlay
  const handleEditClick = (id) => {
    setSelectedId(id);
    fetchDataDetail(id);
    setShowEditOverlay(true);
  };

  // Handle clicking View: open detail overlay, pass id
  const handleViewClick = (id) => {
    setSelectedId(id);
    setShowDetail(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Category</h2>

        <div className="w-full bg-white p-3">
          {/* Top Buttons */}
          <div className="w-[95%] flex justify-end mb-5 gap-3">
            <button
              className="px-5 py-2 bg-blue-500 flex items-center gap-4 font-semibold text-white rounded"
              onClick={() => {
                setData({ name: "", is_active: "active" }); // reset form
                setShowAddOverlay(true);
              }}
            >
              <BiPlus /> Add
            </button>
            <button className="px-3 py-2 bg-gray-400 rounded">
              <BiDownvote />
            </button>
            <button
              className="px-3 py-2 bg-gray-400 rounded"
              onClick={(e) => refreshData(e)}
            >
              <BiSync />
            </button>
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto flex justify-center">
            <table className="w-[95%] text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  category.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td
                        title={
                          item.is_active === "active"
                            ? "This category is active"
                            : "This category is inactive"
                        }
                        className={`font-semibold text-white rounded text-center capitalize ${
                          item.is_active === "active"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {item.is_active}
                      </td>
                      <td className="flex gap-3 justify-center items-center py-2">
                        <button
                          onClick={() => handleViewClick(item._id)}
                          className="p-2 text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditClick(item._id)}
                          className="p-2 text-yellow-500 hover:text-yellow-700"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowConfirmModal(true);
                          }}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Overlay Form */}
      <FlexleftOverlay
        isOpen={showAddOverlay}
        onClose={() => setShowAddOverlay(false)}
        title="Add Category"
      >
        <form className="space-y-4 p-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter category name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="block mb-1">Status</label>
            <SingleChoiceChip
              options={["active", "inactive"]}
              value={data.is_active}
              onChange={(val) => setData({ ...data, is_active: val })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setShowAddOverlay(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleAddSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </FlexleftOverlay>

      {/* Edit Overlay Form */}
      <FlexleftOverlay
        isOpen={showEditOverlay}
        onClose={() => setShowEditOverlay(false)}
        title="Edit Category"
      >
        <form className="space-y-4 p-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter category name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="block mb-1">Status</label>
            <SingleChoiceChip
              options={["active", "inactive"]}
              value={data.is_active}
              onChange={(val) => setData({ ...data, is_active: val })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setShowEditOverlay(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleEditSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </FlexleftOverlay>

      {/* Confirm delete modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this category? This action cannot be undone."
      />

      {/* Detail Page */}
      <CategoryDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        categoryId={selectedId}
      />
    </>
  );
};

export default Category;
