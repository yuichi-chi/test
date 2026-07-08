"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" className="print-button" onClick={() => window.print()}>
      <Printer aria-hidden="true" size={16} strokeWidth={1.75} />
      <span>Print / Save as PDF</span>
    </button>
  );
}
