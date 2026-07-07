"use client";

import { useLayoutEffect } from "react";

const DEV_CSS = "/_next/static/css/app/layout.css";

export function StylesheetLoader() {
  useLayoutEffect(() => {
    if (document.querySelector('link[data-app-css="true"]')) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = DEV_CSS;
    link.setAttribute("data-app-css", "true");
    document.head.prepend(link);
  }, []);

  return null;
}
