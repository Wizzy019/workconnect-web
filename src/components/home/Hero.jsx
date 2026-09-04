import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBookmark,
  faStar,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";

/** A single row inside the "Featured Jobs" card. */
function JobListingItem({
  logoLabel,
  badgeColor,
  title,
  company,
  location,
  salary,
  tags,
  ctaLabel,
}) {
  return (
    <div className="flex items-start gap-wc-3 py-wc-3 border-b border-wc-border last:border-b-0">
      <div
        className="w-9 h-9 rounded-wc-sm shrink-0 flex items-center justify-center text-[10px] font-wc-semibold text-wc-text-inverse"
        style={{ backgroundColor: badgeColor }}
        aria-hidden="true"
      >
        {logoLabel}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-wc-2">
          <p className="text-wc-sm font-wc-medium text-wc-text-heading truncate">
            {title}
          </p>
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-wc-text-muted text-xs mt-0.5 shrink-0"
            aria-hidden="true"
          />
        </div>
        <p className="text-xs text-wc-text">
          {company} &middot; {location}
        </p>
        <p className="text-xs font-wc-medium text-wc-text-heading mt-0.5">
          {salary}
        </p>
        <div className="flex flex-wrap gap-wc-2 mt-wc-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-wc-2 py-0.5 rounded-wc-sm bg-wc-surface text-wc-text"
            >
              {tag}
            </span>
          ))}
          {ctaLabel && (
            <Button
              variant="primary"
              size="sm"
              className="h-auto! py-1! px-wc-3! text-[11px]! ml-auto"
            >
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/** A single skill pill inside the profile card. */
function SkillTag({ label }) {
  return (
    <span className="text-wc-xs px-wc-3 py-1 rounded-wc-sm bg-wc-surface text-wc-text">
      {label}
    </span>
  );
}

const FEATURED_JOBS = [
  {
    logoLabel: "TC",
    badgeColor: "#16a34a",
    title: "Senior Product Designer",
    company: "TechCorp Inc",
    location: "Remote",
    salary: "$100k - $130k",
    tags: ["Full-time", "Design", "Figma"],
  },
  {
    logoLabel: "BP",
    badgeColor: "#2563eb",
    title: "Frontend Developer",
    company: "BrightPath Tech",
    location: "Lagos, Nigeria",
    salary: "$50k - $80k",
    tags: ["Full-time", "React", "TypeScript"],
  },
  {
    logoLabel: "GL",
    badgeColor: "#7c3aed",
    title: "Marketing Specialist",
    company: "GreenLeaf Solutions",
    location: "Hybrid",
    salary: "$35k - $50k",
    tags: ["Marketing", "Content", "SEO"],
  },
];

const PROFILE_SKILLS = [
  "UX Design",
  "Figma",
  "Design System",
  "Prototyping",
  "User Research",
];

const AVATAR_COUNT = 4;

/**
 * Hero
 *
 * Homepage hero: headline + supporting copy + primary/secondary CTAs +
 * social-proof avatar stack on the left, a "Featured Jobs" list card and
 * a candidate profile card on the right.
 *
 * All props are optional and fall back to the reference copy/data so the
 * component renders meaningfully on its own.
 */
export default function Hero({
  headline = "Connect with the right opportunity.",
  headlineAccent = "right",
  description = "WorkConnect connects skilled workers with people offering jobs, making it easier to find the right work or the right person for the job.",
  onFindWorkClick,
  onHireTalentClick,
  socialProofText = "Join thousands of workers and job providers every day",
  profile = {
    name: "Daniel Okeke",
    title: "Product Designer",
    location: "Lagos, Nigeria",
    rating: 4.8,
    reviewCount: 37,
    skills: PROFILE_SKILLS,
  },
  jobs = FEATURED_JOBS,
}) {
  const headlineParts = headline.split(headlineAccent);

  return (
    <section className="mx-auto px-wc-container md:px-wc-8 py-wc-12 md:py-wc-section-desktop grid md:grid-cols-2 gap-wc-12 items-center font-wc-sans">
      {/* Left: copy + CTAs + social proof */}
      <div className="flex flex-col gap-wc-6">
        <h1 className="text-wc-4xl md:text-wc-5xl font-wc-semibold tracking-tight text-wc-text-heading leading-wc-tight">
          {headlineParts[0]}
          <span className="text-wc-primary">{headlineAccent}</span>
          {headlineParts[1]}
        </h1>
        <p className="text-wc-base text-wc-text max-w-wc-content-sm">
          {description}
        </p>

        <div className="flex flex-wrap gap-wc-3">
          <Button variant="primary" size="lg" onClick={onFindWorkClick}>
            Find Work
          </Button>
          <Button variant="secondary" size="lg" onClick={onHireTalentClick}>
            Hire Talent
          </Button>
        </div>

        <div className="flex items-center gap-wc-3 mt-wc-2">
          <div className="flex -space-x-2" aria-hidden="true">
            {Array.from({ length: AVATAR_COUNT }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-wc-background bg-wc-surface flex items-center justify-center text-[10px] text-wc-text-muted"
              >
                {/* placeholder: worker/provider headshot */}
                Photo
              </div>
            ))}
          </div>
          <p className="text-wc-sm text-wc-text">{socialProofText}</p>
        </div>
      </div>

      {/* Right: Featured Jobs card + Profile card */}
      <div className="relative flex flex-col gap-wc-4">
        <div className="bg-wc-background border border-wc-border rounded-wc-lg shadow-wc-md p-wc-4">
          <p className="text-wc-sm font-wc-semibold text-wc-text-heading mb-wc-3">
            Featured Jobs
          </p>
          <div className="flex items-center gap-wc-2 mb-wc-3">
            <div className="flex-1 flex items-center gap-wc-2 border border-wc-border rounded-wc-sm px-wc-3 py-wc-2">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-wc-text-muted text-xs"
                aria-hidden="true"
              />
              <span className="text-xs text-wc-text-muted">
                Search by jobs, skills, or companies
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-wc-2 mb-1">
            <span className="text-xs px-wc-3 py-1 border border-wc-border rounded-wc-sm text-wc-text">
              All Categories
            </span>
            <span className="text-xs px-wc-3 py-1 border border-wc-border rounded-wc-sm text-wc-text">
              Location
            </span>
            <span className="text-xs px-wc-3 py-1 border border-wc-border rounded-wc-sm text-wc-text">
              Job Type
            </span>
          </div>

          <div>
            {jobs.map((job) => (
              <JobListingItem key={job.title} {...job} />
            ))}
          </div>

          <a
            href="#find-work"
            className="text-wc-sm font-wc-medium text-wc-primary inline-block mt-wc-3"
          >
            View all jobs →
          </a>
        </div>

        {/* connector icon between the two cards, decorative */}
        <div
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-wc-background border border-wc-border items-center justify-center shadow-wc-sm"
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={faLink} className="text-wc-primary text-xs" />
        </div>

        <div className="bg-wc-background border border-wc-border rounded-wc-lg shadow-wc-md p-wc-4">
          <div className="flex items-center gap-wc-3">
            <div
              className="w-12 h-12 rounded-full bg-wc-surface flex items-center justify-center text-[10px] text-wc-text-muted shrink-0"
              aria-hidden="true"
            >
              {/* placeholder: profile photo */}
              Photo
            </div>
            <div>
              <p className="text-wc-sm font-wc-semibold text-wc-text-heading">
                {profile.name}
              </p>
              <p className="text-xs text-wc-text">{profile.title}</p>
              <p className="text-xs text-wc-text">{profile.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-wc-2">
            <FontAwesomeIcon
              icon={faStar}
              className="text-[#f59e0b] text-xs"
              aria-hidden="true"
            />
            <span className="text-xs font-wc-medium text-wc-text-heading">
              {profile.rating}
            </span>
            <span className="text-xs text-wc-text-muted">
              ({profile.reviewCount} reviews)
            </span>
          </div>

          <p className="text-xs font-wc-medium text-wc-text-heading mt-wc-3 mb-wc-2">
            Skills
          </p>
          <div className="flex flex-wrap gap-wc-2 mb-wc-4">
            {profile.skills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>

          <Button variant="primary" fullWidth>
            View Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
