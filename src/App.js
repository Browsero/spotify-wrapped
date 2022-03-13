import React, { useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import aos from "aos";
import "aos/dist/aos.css";

const code = new URLSearchParams(window.location.search).get("code");

export default function () {
  useEffect(() => {
    aos.init({ duration: 1000, once: true });
  }, []);
  return <>{code ? <Dashboard code={code} /> : <Login />}</>;
}
