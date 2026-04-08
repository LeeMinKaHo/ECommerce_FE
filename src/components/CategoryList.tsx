import React from 'react';
import { useState } from 'react';

export default function CategoryList({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log('categories', categories);
  return (
    <div className="">
      <button
        className="font-secondary mb-3 rounded-lg px-4 py-2 text-2xl font-semibold text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Categories ▲' : 'Categories ▼'}
      </button>

      {isOpen && (
        <ul className="list-disc space-y-1 pl-5">
          {categories.map((cat) => (
            <li className="font-secondary text-xl font-medium" key={cat._id}>
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
