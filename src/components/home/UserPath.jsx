import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";

/**
 * UserPath
 *
 * Represents one side of "One platform. Two paths." (e.g. "For Workers" or
 * "For Job Providers"). On desktop it renders the full sequence of steps
 * as connected icon nodes with a title/description grid underneath. On
 * mobile it collapses to a single summary row card, matching the
 * reference layout.
 *
 * steps: [{ icon, title, description }]
 */
export default function UserPath({
  label,
  summaryIcon,
  summaryTitle,
  summaryDescription,
  steps = [],
  onClick,
}) {
  return (
    <div className="flex-1 font-wc-sans">
      {/* Desktop: label + connected step sequence */}
      <div className="hidden md:block">
        <p className="text-wc-sm font-wc-semibold text-wc-text-heading mb-wc-6">{label}</p>

        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <div
                className="w-10 h-10 rounded-full bg-wc-primary-light flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={step.icon} className="text-wc-primary text-wc-sm" />
              </div>
              {index < steps.length - 1 && (
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-wc-text-muted text-xs mx-wc-2 shrink-0"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid gap-wc-6 mt-wc-6" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step) => (
            <div key={step.title}>
              <p className="text-wc-sm font-wc-medium text-wc-text-heading">{step.title}</p>
              <p className="text-xs text-wc-text mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: collapsed summary card */}
      <button
        type="button"
        onClick={onClick}
        className="md:hidden w-full flex items-center gap-wc-3 bg-wc-background border border-wc-border rounded-wc-md p-wc-4 text-left"
      >
        <div
          className="w-9 h-9 rounded-full bg-wc-primary-light flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={summaryIcon} className="text-wc-primary text-wc-sm" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-wc-sm font-wc-medium text-wc-text-heading">{summaryTitle}</p>
          <p className="text-xs text-wc-text">{summaryDescription}</p>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className="text-wc-text-muted text-xs shrink-0" aria-hidden="true" />
      </button>
    </div>
  );
}
