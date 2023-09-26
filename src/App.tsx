import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
  ]);
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </ReduxProvider>
  );
}

export default App;
