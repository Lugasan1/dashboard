/*import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;*/

import { useEffect, useState } from "react";

const useColorMode = () => {
  const [colorMode, setColorMode] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorMode === "dark" ? "light" : "dark");
    root.classList.add(colorMode);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;

