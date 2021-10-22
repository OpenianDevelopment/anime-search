import "tailwindcss/tailwind.css";
import { ThemeProvider } from "styled-components";
import { createRef, useState, useEffect } from "react";
import useDarkMode from "use-dark-mode";
import { light, dark, Global } from "../assets/js/Theme.config";

function MyApp({ Component, pageProps }) {
  const [isUsed, setUsed] = useState(false);
  const [isIndex, setIsIndex] = useState(true);
  const darkmode = useDarkMode(true);
  const theme = darkmode.value ? dark : light;

  useEffect(() => {
    setUsed(true);
    if(/\/search/.test(window.location.href)) {
      setIsIndex(false)
    }
  }, []);

  const searchString = createRef();
  function searchedAnimeButton() {
    window.location.href = `${window.origin}/search?q=${searchString.current.value}`;
  }
  const searchBar = {
    bgcolor: darkmode.value ? " bg-white " : " bg-black ",
    txtcolor: darkmode.value ? " text-gray-800 " : " text-gray-300 ",
    btnhovercolor: darkmode.value ? " hover:bg-red-600 " : " hover:bg-red-800 ",
  };
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <ul class="flex justify-center">
        {isIndex ? " " : (<li class="mr-2 p-3">
          <div
            className={
              searchBar.bgcolor + "flex items-center rounded-full shadow-xl"
            }
          >
            <input
              ref={searchString}
              className={
                searchBar.txtcolor +
                searchBar.bgcolor +
                "rounded-l-full w-full py-2 px-3 leading-tight focus:outline-none"
              }
              id="search"
              type="text"
              placeholder="Search"
            ></input>

            <div className={"p-2"}>
              <button
                onClick={searchedAnimeButton}
                className={
                  searchBar.btnhovercolor +
                  "rounded-full focus:outline-none w-12 flex items-center justify-center"
                }
                style={{ transition: "all 250ms linear" }}
              >
                🔍
              </button>
            </div>
          </div>
        </li>)}
        <li class="ml-2 p-5">
          <button onClick={darkmode.toggle}>
            {darkmode.value ? "☀️" : "🌙"}
          </button>
        </li>
      </ul>
      {isUsed && <Component dark={darkmode.value} {...pageProps} />}
    </ThemeProvider>
  );
}

export default MyApp;
