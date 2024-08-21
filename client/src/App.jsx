import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "./components/BreadCrumb";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Breadcrumb/>
      <main className="py-3 z-10 ">
        <Outlet />
      </main>
    </>
  );
}

export default App;
