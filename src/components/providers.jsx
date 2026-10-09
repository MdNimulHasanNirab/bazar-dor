"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        containerStyle={{ top: 82 }}
        toastOptions={{ duration: 3500 }}
      />
    </>
  );
}