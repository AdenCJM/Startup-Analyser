import type { Stage, Quadrant } from "@/content/types";

const STAGE_STYLE: Record<Stage, string> = {
  Backlog: "text-muted border-border",
  Validating: "text-build border-build/40",
  Watching: "text-watching border-watching/40",
  Parked: "text-muted border-border",
  Killed: "text-kill border-kill/40",
  Active: "text-build border-build/40",
};

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${STAGE_STYLE[stage] ?? "text-muted border-border"}`}
    >
      {stage}
    </span>
  );
}

const QUAD_LABEL: Record<Quadrant, string> = {
  BUILD: "Build",
  BUILD_BORDERLINE: "Build (borderline)",
  OPPORTUNITY_GAP: "Opportunity gap",
  LIFESTYLE: "Lifestyle",
  KILL: "Kill",
  STRATEGY: "Strategy",
};

const QUAD_STYLE: Record<Quadrant, string> = {
  BUILD: "text-build",
  BUILD_BORDERLINE: "text-build",
  OPPORTUNITY_GAP: "text-gap",
  LIFESTYLE: "text-muted",
  KILL: "text-kill",
  STRATEGY: "text-muted",
};

export function QuadrantBadge({ quadrant }: { quadrant: Quadrant }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[11px] font-medium ${QUAD_STYLE[quadrant]}`}
    >
      {QUAD_LABEL[quadrant]}
    </span>
  );
}
