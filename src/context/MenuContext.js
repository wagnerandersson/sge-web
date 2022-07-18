import React, { createContext, useState, useContext } from "react";
import { Children } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [state, setState] = useState("start");
  const [listId, setListId] = useState(0);
  const [values, setValues] = useState(0);
  return (
    <MenuContext.Provider
      value={{ state, listId, values, setState, setListId, setValues }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  const { state, setState } = context;
  const { listId, setListId } = context;
  const { values, setValues } = context;
  return { state, setState, listId, setListId, values, setValues };
};

export default MenuProvider;
