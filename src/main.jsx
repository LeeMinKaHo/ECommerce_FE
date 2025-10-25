import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LayoutProvider } from "./components/layout/LayoutContext"; // nhớ import
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";  // <-- Thêm dòng này
import { store } from "./redux/store";  // <-- Đường dẫn store của bạn
createRoot(document.getElementById("root")).render(
   <StrictMode>
      <Provider store={store}>
          <LayoutProvider>
         <RouterProvider router={router} />
         </LayoutProvider>
      </Provider>
   </StrictMode>
);
