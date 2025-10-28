"use client";

import React, { createContext, useContext, useReducer } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
    mode: "light",
    bg: "bg-(--color-beige)",
    text: "text-(--color-sage-green)",
    headerFooterBg: "bg-(--color-sage-green)",
    headerFooterText: "text-(--color-beige)",
};

const darkTheme = {
    mode: "dark",
    bg: "bg-(--color-sage-green)",
    text: "text-(--color-beige)",
    headerFooterBg: "bg-(--color-sage-green)",
    headerFooterText: "text-(--color-beige)",
};

function reducer(state, action) {
    switch (action.type) {
    case "toggle":
        return state.mode === "light" ? darkTheme : lightTheme;
    default:
        return state;
    }
}

export default function ReducerTheme({ children }) {
    const [theme, dispatch] = useReducer(reducer, lightTheme);

    return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
        <div className={`${theme.bg} ${theme.text} flex flex-col min-h-screen`}>
        {children}
        </div>
    </ThemeContext.Provider>
    );
}
