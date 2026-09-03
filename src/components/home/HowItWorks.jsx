import React from "react";
import {
  faIdCard,
  faMagnifyingGlass,
  faPaperPlane,
  faUserPlus,
  faBriefcase,
  faUsers,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "./SectionHeading";
import UserPath from "./UserPath";

const WORKER_STEPS = [
  {
    icon: faIdCard,
    title: "Create your profile",
    description: "Build a profile that highlights your skills and experience.",
  },
  {
    icon: faMagnifyingGlass,
    title: "Find opportunities",
    description: "Browse jobs that match your skills.",
  },
  {
    icon: faPaperPlane,
    title: "Apply for jobs",
    description: "Submit applications and connect with job providers.",
  },
];

const PROVIDER_STEPS = [
  {
    icon: faUserPlus,
    title: "Create an account",
    description: "Set up your profile and get ready to hire.",
  },
  {
    icon: faBriefcase,
    title: "Post a job",
    description: "Describe the work and skills you need.",
  },
  {
    icon: faUsers,
    title: "Find skilled workers",
    description: "Discover people with relevant skills.",
  },
  {
    icon: faClipboardCheck,
    title: "Manage applications",
    description: "Review applicants and choose the right person.",
  },
];

/**
 * HowItWorks
 *
 * "One platform. Two paths." section: intro heading followed by the
 * Workers path and the Job Providers path side by side (stacked on mobile).
 */
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-wc-surface py-wc-12 md:py-wc-section-desktop font-wc-sans"
    >
      <div className="mx-auto px-wc-container md:px-wc-8">
        <SectionHeading title="One platform. Two paths." className="mb-wc-12" />

        <div className="flex flex-col md:flex-row gap-wc-8 md:gap-wc-12">
          <UserPath
            label="FOR WORKERS"
            summaryIcon={faIdCard}
            summaryTitle="For Workers"
            summaryDescription="3 steps to find your next opportunity"
            steps={WORKER_STEPS}
          />
          <UserPath
            label="FOR JOB PROVIDERS"
            summaryIcon={faBriefcase}
            summaryTitle="For Job Providers"
            summaryDescription="4 steps to find the right talent"
            steps={PROVIDER_STEPS}
          />
        </div>
      </div>
    </section>
  );
}
