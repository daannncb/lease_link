"use client";

import { useTheme } from "@/components/reducerTheme";

export default function ThemedSection({ children, className = "" }) {
  const { theme } = useTheme();

  return (
    <div className={`${theme.bg} ${theme.text} ${className} transition-colors duration-300`}>
      {children}
    </div>
  );
}
