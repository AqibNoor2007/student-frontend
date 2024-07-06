import { PropagateLoader } from "react-spinners";

const Loader = ({ isLoading = false }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed z-[99999] w-full h-full bg-slate-600 opacity-[.3]"></div>
      )}

      <div className="fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] z-[999999]">
        <PropagateLoader
          color="#B330FA"
          loading={isLoading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Loader;
