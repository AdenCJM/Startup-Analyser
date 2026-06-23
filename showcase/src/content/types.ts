// Shape of the outward-facing dataset emitted by scripts/build-content.mjs.
// This file is the contract between the parser and the app. The parser drops
// the founder-fit "Fit" column and all private sections, and a leak scrub
// fails the build if any private token survives into these strings.

export type Stage =
  | "Backlog"
  | "Validating"
  | "Watching"
  | "Parked"
  | "Killed"
  | "Active";

export type IdeaType = "Standalone" | "Distribution" | "PositioningVariant";

export type Quadrant =
  | "BUILD"
  | "BUILD_BORDERLINE"
  | "OPPORTUNITY_GAP"
  | "LIFESTYLE"
  | "KILL"
  | "STRATEGY";

export type MarketDimensionName =
  | "Problem Severity"
  | "Market Size"
  | "Defensibility"
  | "Timing"
  | "Value Capture";

export interface MarketDimension {
  dimension: MarketDimensionName;
  score: number; // 1-5
  justification: string;
}

export interface MarketOpportunity {
  dimensions: MarketDimension[];
  composite: number; // e.g. 3.4, out of 5
  quadrant: Quadrant;
}

export type SectionKey =
  | "elevatorPitch"
  | "buyer"
  | "problem"
  | "offer"
  | "price"
  | "firstTen"
  | "revenue";

export interface IdeaSection {
  key: SectionKey;
  heading: string;
  markdown: string;
}

export interface Idea {
  slug: string;
  name: string;
  tagline: string;
  type: IdeaType;
  stage: Stage;
  oneLiner: string;
  market: MarketOpportunity | null;
  sections: IdeaSection[];
  relatedSlugs: string[];
}

export interface Founder {
  name: string;
  positioning: string;
  contact?: string;
}

export interface Dataset {
  generatedAt: string;
  founder: Founder;
  featured: Idea[]; // strong ideas, shown in the main grid
  explored: Idea[]; // curated killed/parked, shown in the collapsed accordion
}
