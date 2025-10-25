import React from "react";
import { useState } from "react";

export default function CategoryList({ categories  }) {
  const [isOpen, setIsOpen] = useState(false);
    console.log("categories", categories);
  return (
    <div className="">
      <button
        className="text-black font-secondary font-semibold text-2xl px-4 py-2 rounded-lg mb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Categories ▲" : "Categories ▼"}
      </button>

      {isOpen && (
        <ul className="list-disc pl-5 space-y-1">
          {categories.map((cat) => (
            <li className="text-xl font-secondary font-medium" key={cat._id}>{cat.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
