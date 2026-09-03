import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * BenefitCard
 *
 * Icon-in-circle + title + description, used for the "Simple",
 * "Skill-focused", and "Built for connection" benefit tiles.
 */
export default function BenefitCard({
  icon,
  title,
  description,
  align = "center",
}) {
  const alignClasses =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`flex flex-col font-wc-sans ${alignClasses} gap-wc-3`}>
      <div
        className="w-12 h-12 rounded-full bg-wc-primary-light flex items-center justify-center"
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={icon} className="text-wc-primary text-wc-lg" />
      </div>
      <p className="text-wc-base font-wc-medium text-wc-text-heading">
        {title}
      </p>
      <p className="text-wc-sm text-wc-text max-w-60">{description}</p>
    </div>
  );
}
