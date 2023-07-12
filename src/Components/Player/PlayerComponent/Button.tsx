import React from "react";

interface ButtonProps {
  open: boolean;
  openHolst: any;
}
const Button: React.FC<ButtonProps> = ({ open, openHolst }) => {
  return (
    <button
      className={
        open === false
          ? "mx-auto rounded-t-lg w-20 absolute left-[50%] translate-x-[-50%] top-[-42%] p-2   bg-neutral-800/60   hover:"
          : "mx-auto rounded-b-lg w-20 absolute left-[50%] translate-x-[-50%] top-[-0%]  p-2   bg-white text-black   hover:"
      }
      onClick={openHolst}
    >
      {open === false ? "open" : "close"}
    </button>
  );
};

export default Button;
