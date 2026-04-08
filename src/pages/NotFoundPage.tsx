// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold">404</h1>
      <p className="mb-6 text-xl">Oops! Page not found.</p>
      <Link
        to="/"
        className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
};
