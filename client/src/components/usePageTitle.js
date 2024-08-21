
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = (title) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
  }, [pathname, title]);
};

export default usePageTitle;
