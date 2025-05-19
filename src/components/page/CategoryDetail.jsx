import React, { useEffect, useState } from "react";
import FlexleftOverlay from "../FlexleftOverlay";
import axios from "axios";
import { useToast } from "../Toast";

const CategoryDetail = ({ isOpen, onClose, categoryId }) => {
  const [data, setData] = useState({ name: "", is_active: "" });
  const { showToast } = useToast();


  useEffect(() => {
    if (isOpen && categoryId) {
      axios
        .get(`http://localhost:5000/api/category/${categoryId}`)
        .then((res) => setData(res.data.data))
        .catch(() => showToast("Failed to load category", "error"));
    }
  }, [isOpen, categoryId]);

  return (
    <FlexleftOverlay isOpen={isOpen} onClose={onClose} title="Category Detail">
      <div className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <p className="mt-1 px-3 py-2 border rounded bg-gray-100 text-gray-800">
            {data.name || "N/A"}
          </p>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <p
            className={`mt-1 inline-block px-4 py-1 rounded-full text-white font-medium capitalize ${
              data.is_active === "active" ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {data.is_active || "N/A"}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </FlexleftOverlay>
  );
};

export default CategoryDetail;
