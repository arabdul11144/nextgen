"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TypewriterOptions {
  prefix?: string;
  terms: string[];
  typeSpeed?: number;
  typePause?: number;
  deleteSpeed?: number;
  deletePause?: number;
}

interface TypewriterState {
  placeholder: string;
  active: boolean;
}

export function useTypewriterPlaceholder({
  prefix = "Search for ",
  terms,
  typeSpeed = 70,
  typePause = 1300,
  deleteSpeed = 35,
  deletePause = 300,
}: TypewriterOptions): TypewriterState & {
  stop: () => void;
  reset: () => void;
} {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [state, setState] = useState<TypewriterState>({
    placeholder: prefersReducedMotion
      ? "Search products, services, industries…"
      : prefix,
    active: !prefersReducedMotion,
  });

  const termIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(!prefersReducedMotion);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(
    (delay: number) => {
      timerRef.current = setTimeout(() => tick(), delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function tick() {
    if (!activeRef.current) return;

    const term = terms[termIndexRef.current];
    const ci = charIndexRef.current;
    const termLen = term.length;
    let nextDelay: number;

    if (ci < termLen) {
      setState({
        placeholder: prefix + term.slice(0, ci + 1),
        active: true,
      });
      charIndexRef.current = ci + 1;
      nextDelay = typeSpeed;
    } else if (ci === termLen) {
      setState({ placeholder: prefix + term, active: true });
      charIndexRef.current = ci + 1;
      nextDelay = typePause;
    } else if (ci <= termLen * 2) {
      const visible = termLen - (ci - termLen);
      setState({
        placeholder: prefix + term.slice(0, visible),
        active: true,
      });
      charIndexRef.current = ci + 1;
      nextDelay = deleteSpeed;
    } else {
      termIndexRef.current =
        (termIndexRef.current + 1) % terms.length;
      charIndexRef.current = 0;
      setState({ placeholder: prefix, active: true });
      nextDelay = deletePause;
    }

    scheduleNext(nextDelay);
  }

  useEffect(() => {
    if (prefersReducedMotion) return;
    activeRef.current = true;
    timerRef.current = setTimeout(() => tick(), 400);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTimer, prefersReducedMotion]);

  const stop = useCallback(() => {
    activeRef.current = false;
    clearTimer();
    setState({ placeholder: "", active: false });
  }, [clearTimer]);

  const reset = useCallback(() => {
    if (prefersReducedMotion) return;
    clearTimer();
    termIndexRef.current = 0;
    charIndexRef.current = 0;
    activeRef.current = true;
    timerRef.current = setTimeout(() => tick(), 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTimer, prefersReducedMotion]);

  return { ...state, stop, reset };
}
