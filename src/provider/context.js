import React, { useState, createContext, useEffect } from "react";
import { loadEthereum } from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [state, setstate] = useState("hello from context");

  useEffect(() => {
    const done = async () => {
      await loadEthereum();
    };
    done();
  }, []);

  return (
    <AuthContext.Provider value={{ state, setstate }}>
      {props.children}
    </AuthContext.Provider>
  );
};
