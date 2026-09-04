import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "./SectionHeading";
import Button from "../common/Button";

const FIND_WORK_NAV = [
  "Browse Jobs",
  "Saved Jobs",
  "Applications",
  "Messages",
  "Profile",
  "Settings",
];

const FIND_WORK_LISTINGS = [
  {
    title: "Senior UX Designer",
    company: "Vertex Labs",
    location: "Remote",
    salary: "$100k - $120k",
  },
  {
    title: "Product Manager",
    company: "BrightPath Tech",
    location: "Lagos, Nigeria",
    salary: "$80k - $100k",
  },
  {
    title: "Data Analyst",
    company: "DataCorp",
    location: "Hybrid",
    salary: "$90k - $110k",
  },
];

const HIRE_TALENT_LISTINGS = [
  {
    name: "Amina Yusuf",
    title: "Frontend Developer",
    experience: "3+ years",
    rating: 4.9,
  },
  {
    name: "Chinedu Eze",
    title: "Backend Developer",
    experience: "5+ years",
    rating: 4.7,
  },
  {
    name: "Fatima Bello",
    title: "UI/UX Designer",
    experience: "4+ years",
    rating: 4.9,
  },
];

/** Checklist row with a green checkmark, used by both panels. */
function ChecklistItem({ children }) {
  return (
    <li className="flex items-center gap-wc-2 text-wc-sm text-wc-text">
      <FontAwesomeIcon
        icon={faCheck}
        className="text-wc-primary text-xs shrink-0"
        aria-hidden="true"
      />
      {children}
    </li>
  );
}

/** Mini app-preview mockup shown inside the "Find Work" panel. */
function FindWorkMockup() {
  return (
    <div className="bg-wc-background border border-wc-border rounded-wc-md shadow-wc-sm overflow-hidden flex">
      <div className="hidden sm:flex flex-col gap-1 w-32 shrink-0 border-r border-wc-border p-wc-3">
        {FIND_WORK_NAV.map((item, i) => (
          <span
            key={item}
            className={
              i === 0
                ? "text-xs font-wc-medium text-wc-primary px-wc-2 py-1.5 rounded-wc-sm bg-wc-primary-light"
                : "text-xs text-wc-text px-wc-2 py-1.5"
            }
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex-1 p-wc-3 min-w-0">
        <div className="flex items-center gap-wc-2 border border-wc-border rounded-wc-sm px-wc-3 py-wc-2 mb-wc-3">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-wc-text-muted text-xs"
            aria-hidden="true"
          />
          <span className="text-xs text-wc-text-muted">
            Search by skills, or companies
          </span>
        </div>
        {FIND_WORK_LISTINGS.map((job) => (
          <div
            key={job.title}
            className="flex items-center justify-between gap-wc-2 py-wc-2 border-b border-wc-border last:border-b-0"
          >
            <div className="min-w-0">
              <p className="text-xs font-wc-medium text-wc-text-heading truncate">
                {job.title}
              </p>
              <p className="text-[11px] text-wc-text truncate">
                {job.company} &middot; {job.location}
              </p>
              <p className="text-[11px] text-wc-text-heading">{job.salary}</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="h-auto! py-1! px-wc-3! text-[11px]! shrink-0"
            >
              Apply
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mini app-preview mockup shown inside the "Hire Talent" panel. */
function HireTalentMockup() {
  return (
    <div className="bg-wc-background border border-wc-border rounded-wc-md shadow-wc-sm p-wc-3">
      <div className="flex items-center gap-wc-2 border border-wc-border rounded-wc-sm px-wc-3 py-wc-2 mb-wc-3">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-wc-text-muted text-xs"
          aria-hidden="true"
        />
        <span className="text-xs text-wc-text-muted">Search by name</span>
      </div>
      {HIRE_TALENT_LISTINGS.map((person) => (
        <div
          key={person.name}
          className="flex items-center gap-wc-3 py-wc-2 border-b border-wc-border last:border-b-0"
        >
          <div
            className="w-8 h-8 rounded-full bg-wc-surface flex items-center justify-center text-[9px] text-wc-text-muted shrink-0"
            aria-hidden="true"
          >
            {/* placeholder: candidate photo */}
            Photo
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-wc-medium text-wc-text-heading truncate">
              {person.name}
            </p>
            <p className="text-[11px] text-wc-text truncate">
              {person.title} &middot; {person.experience}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <FontAwesomeIcon
              icon={faStar}
              className="text-[#f59e0b] text-[10px]"
              aria-hidden="true"
            />
            <span className="text-[11px] text-wc-text-heading">
              {person.rating}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Shared panel shell: eyebrow, heading, description, checklist, mockup, link. */
function ShowcasePanel({
  eyebrow,
  heading,
  description,
  checklist,
  mockup,
  linkLabel,
  linkHref,
  tint,
}) {
  return (
    <div
      className={`rounded-wc-lg p-wc-6 md:p-wc-8 flex-1 font-wc-sans ${tint}`}
    >
      <span className="inline-block text-[11px] font-wc-semibold px-wc-3 py-1 rounded-wc-sm mb-wc-4 bg-wc-background text-wc-primary">
        {eyebrow}
      </span>
      <h3 className="text-wc-xl font-wc-semibold text-wc-text-heading mb-1">
        {heading}
      </h3>
      <p className="text-wc-sm text-wc-text mb-wc-4">{description}</p>

      <ul className="flex flex-col gap-wc-2 mb-wc-6">
        {checklist.map((item) => (
          <ChecklistItem key={item}>{item}</ChecklistItem>
        ))}
      </ul>

      <div className="mb-wc-4">{mockup}</div>

      <a href={linkHref} className="text-wc-sm font-wc-medium text-wc-primary">
        {linkLabel} →
      </a>
    </div>
  );
}

/**
 * ProductShowcase
 *
 * "Explore WorkConnect" section: introduces the two core flows — finding
 * work and hiring talent — each with a feature checklist and a mini
 * product-preview mockup.
 */
export default function ProductShowcase() {
  return (
    <section
      id="find-work"
      className="py-wc-12 md:py-wc-section-desktop font-wc-sans"
    >
      <div className="mx-auto px-wc-container md:px-wc-8">
        <SectionHeading
          title="Explore WorkConnect"
          subtitle="Two ways to get started. Built for everyone."
          className="mb-wc-12"
        />

        <div className="flex flex-col md:flex-row gap-wc-6">
          <ShowcasePanel
            eyebrow="FIND WORK"
            tint="bg-wc-primary-light"
            heading="Find Work"
            description="Find opportunities that match your skills."
            checklist={[
              "Discover relevant jobs",
              "Filter by skills and location",
              "Apply with one click",
              "Track your applications",
            ]}
            mockup={<FindWorkMockup />}
            linkLabel="View all jobs"
            linkHref="#find-work"
          />
          <ShowcasePanel
            eyebrow="HIRE TALENT"
            tint="bg-wc-surface"
            heading="Hire Talent"
            description="Find skilled people for the work you need done."
            checklist={[
              "Search by skills and experience",
              "View detailed profiles",
              "Message and connect",
              "Manage applications",
            ]}
            mockup={<HireTalentMockup />}
            linkLabel="View all talent"
            linkHref="#hire-talent"
          />
        </div>
      </div>
    </section>
  );
}
