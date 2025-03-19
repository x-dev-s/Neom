"use client" ;
import React from "react";
import Cookies from "universal-cookie";

export function useUser() {
  const [user, setUser] = React.useState(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("session") ?? null;
    const response = await fetch("/api/user?token=" + token);
    if (response.status === 200) {
      const User = await response.json();
      setUser(User);
      return User;
    }
    setUser(null);
    return null;
  };
  React.useEffect(() => {
    getVerifiedtoken();
  }, []);
  
  return user;
}