import React, { useState, createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [state, setstate] = useState("hello from context");

  return (
    <AuthContext.Provider value={{ state, setstate }}>
      {props.children}
    </AuthContext.Provider>
  );
};
