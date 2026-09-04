/* ============================================================
   Site stats — single source of truth for the real numbers
   used in the trust bar, stat chips and count-up strip.
   No invented claims: only figures already on the site.
   ============================================================ */

import { services } from "./services";
import { portfolioProjects } from "./portfolio";

/** Years of experience — the figure already stated across the site */
export const YEARS_OF_EXPERIENCE = 30;

export const SERVICE_COUNT = services.length;

export const PROJECT_COUNT = portfolioProjects.length;