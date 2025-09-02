// src/styles/selectStyles.js
export const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "4px 0",
      fontSize: "15px",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      fontSize: "14px",
    }),
  };