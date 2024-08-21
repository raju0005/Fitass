import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter(x => x);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-4 sticky top-[85px] z-30">
      <ol className="flex items-center space-x-4 text-white">
        <li>
          <button
            onClick={() => handleNavigation('/')}
            className="hover:text-gray-400 hover:scale-105 transform transition-transform cursor-pointer px-2 py-1  text-[20px] text-center uppercase"
          >
            Home
          </button>
        </li>
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const href = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <React.Fragment key={href}>
              <li>
                {isLast ? (
                  <span className="text-gray-500 uppercase">{name}</span>
                ) : (
                  <button
                    onClick={() => handleNavigation(href)}
                    className="hover:text-gray-400 cursor-pointer uppercase"
                  >
                    {name}
                  </button>
                )}
              </li>
              {!isLast && <span className="text-gray-500 mx-2">/</span>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
