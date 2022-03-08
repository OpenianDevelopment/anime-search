import { createGlobalStyle } from "styled-components";
import { Theme } from ".";

export const light = {
    body: "#FFF",
    text: "#363537",
};

export const dark = {
    body: "#0f0f0f",
    text: "#ebebeb",
};

export const Global = createGlobalStyle`body {
    background: ${({ theme }: Theme) => theme.body};
    color: ${({ theme }: Theme) => theme.text};
    font-family: 'Balsamiq Sans', cursive, Arial, Roboto, sans-serif;
    transition: all 450ms linear;
  }`;
