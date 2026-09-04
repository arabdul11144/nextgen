/* ============================================================
   Motion utilities — toast + particle burst
   ============================================================ */

const TOAST_EVENT = "ng:toast";

export interface ToastDetail {
  title: string;
  message?: string;
}

/** Fire a confirmation toast (rendered by <ToastHost /> in the layout). */
export function showToast(detail: ToastDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ToastDetail>(TOAST_EVENT, { detail }));
}

export { TOAST_EVENT };