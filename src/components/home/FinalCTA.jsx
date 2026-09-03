import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

/**
 * FinalCTA
 *
 * "Ready to make your next connection?" closing section: icon, heading,
 * supporting copy, and the same Find Work / Hire Talent CTA pair used
 * in the hero.
 */
export default function FinalCTA({ onFindWorkClick, onHireTalentClick }) {
  return (
    <section className="py-wc-12 md:py-wc-section-desktop font-wc-sans">
      <div className="mx-auto px-wc-container md:px-wc-8">
        <div className="bg-wc-primary-light rounded-wc-lg p-wc-8 md:p-wc-12 flex flex-col md:flex-row items-center gap-wc-6 md:gap-wc-8 text-center md:text-left">
          <div
            className="w-16 h-16 rounded-full bg-wc-background flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <FontAwesomeIcon
              icon={faUserGroup}
              className="text-wc-primary text-wc-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-wc-2xl md:text-wc-3xl font-wc-semibold text-wc-text-heading tracking-tight leading-wc-tight">
              Ready to make your next connection?
            </h2>
            <p className="text-wc-base text-wc-text mt-wc-2 max-w-wc-content-md">
              Whether you&apos;re looking for your next opportunity or the right
              person for the job, WorkConnect gives you a place to start.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-wc-3 shrink-0">
            <Button variant="primary" size="lg" onClick={onFindWorkClick}>
              Find Work
            </Button>
            <Button variant="secondary" size="lg" onClick={onHireTalentClick}>
              Hire Talent
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
