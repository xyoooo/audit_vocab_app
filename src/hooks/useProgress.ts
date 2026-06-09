"use client";

import { useEffect, useState } from "react";
import { AppProgress } from "@/lib/types";
import { defaultProgress, loadProgress, saveProgress } from "@/lib/storage";

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress>(defaultProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  const updateProgress = (updater: AppProgress | ((current: AppProgress) => AppProgress)) => {
    setProgress((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      saveProgress(next);
      return next;
    });
  };

  return { progress, ready, setProgress: updateProgress };
}
