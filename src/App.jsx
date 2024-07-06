import { Outlet } from "react-router-dom";
import "./App.css";
import Loader from "./pages/loader";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

function App() {
  const isMutattin = useIsMutating();
  const isFetching = useIsFetching();
  return (
    <>
      <Loader isLoading={isMutattin > 0 || isFetching > 0} />
      <Outlet />
    </>
  );
}

export default App;
