import React, { useEffect } from "react";

interface MenuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isRotated: boolean;
  setIsRotated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({
  show,
  setShow,
  isRotated,
  setIsRotated,
}) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsRotated(false); // Hide when screen size is `md` or larger
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsRotated]);

  return (
    <>
      <div
        className="w-full box-border  "
        onClick={() => {
          setIsRotated(!isRotated);
          setShow(!show);
        }}
      >
        <div
          className={`space-y-2 relative box-border transform transition-transform duration-500 ${
            isRotated ? "translate-y-1.5 " : "translate-y-0"
          }   `}
        >
          <div
            className={`rotate-line py-[1.3px] w-6 bg-black transform transition-transform duration-500 ${
              isRotated
                ? "rotate-[-132deg] translate-x-[-0.25rem]  "
                : "rotate-0"
            }`}
          ></div>
          <div
            className={`rotate-line py-[1.3px] w-6 bg-black transform transition-transform duration-500 origin-left ${
              isRotated
                ? "rotate-[-45deg]  translate-y-[-0.1rem]  "
                : "rotate-0"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};
export default Menu;
