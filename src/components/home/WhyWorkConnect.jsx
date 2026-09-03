import React from "react";
import { faBolt, faBullseye, faLink } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "./SectionHeading";
import BenefitCard from "./BenefitCard";

const BENEFITS = [
  {
    icon: faBolt,
    title: "Simple",
    description:
      "Find opportunities and connect without unnecessary complexity.",
  },
  {
    icon: faBullseye,
    title: "Skill-focused",
    description:
      "Showcase what you can do and discover people with the skills you need.",
  },
  {
    icon: faLink,
    title: "Built for connection",
    description: "Bring workers and job providers together in one place.",
  },
];

/**
 * WhyWorkConnect
 *
 * "Built to make the right connection easier." section: heading followed
 * by a three-column grid of core product benefits.
 */
export default function WhyWorkConnect() {
  return (
    <section className="py-wc-12 md:py-wc-section-desktop font-wc-sans">
      <div className="mx-auto px-wc-container md:px-wc-8">
        <SectionHeading
          title="Built to make the right connection easier."
          className="mb-wc-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-wc-8 justify-items-center">
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
