"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export interface OpenState {
  /** null mientras no se ha calculado en cliente (evita hydration mismatch) */
  open: boolean | null;
  time: string;
  /** Día de la semana en Lima (0 = domingo), -1 antes de calcular */
  weekday: number;
}

const weekdayMap: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

function computeOpen(): OpenState {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = parseInt(get("hour"), 10) % 24;
  const minute = parseInt(get("minute"), 10);
  const weekday = weekdayMap[get("weekday")] ?? new Date().getDay();

  const today = site.schedule[weekday];
  const open = !!today && hour >= today.open && hour < today.close;

  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const time = `${h12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
  return { open, time, weekday };
}

/** Calcula en vivo si la barbería está abierta (hora de Lima, GMT-5). */
export function useOpenNow(): OpenState {
  const [state, setState] = useState<OpenState>({ open: null, time: "", weekday: -1 });

  useEffect(() => {
    setState(computeOpen());
    const id = setInterval(() => setState(computeOpen()), 30_000);
    return () => clearInterval(id);
  }, []);

  return state;
}

/** "11 AM", "10 PM" */
export function fmtHour(h: number): string {
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:00 ${h >= 12 ? "PM" : "AM"}`;
}
