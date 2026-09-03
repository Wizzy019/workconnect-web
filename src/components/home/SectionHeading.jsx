import React from "react";

/**
 * SectionHeading
 *
 * Centered title + optional supporting subtitle, used to introduce
 * "One platform. Two paths.", "Explore WorkConnect", and
 * "Built to make the right connection easier." sections.
 *
 * align: "center" (default) | "left"
 */
export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClasses = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`flex flex-col font-wc-sans ${alignClasses} gap-wc-3 ${className}`}>
      <h2 className="text-wc-2xl md:text-wc-3xl font-wc-semibold text-wc-text-heading leading-wc-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-wc-base text-wc-text max-w-wc-content-sm">{subtitle}</p>
      )}
    </div>
  );
}
