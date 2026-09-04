import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Button
 *
 * Shared CTA button used across the homepage (navbar "Get Started",
 * hero "Find Work" / "Hire Talent", CTA sections, card actions, etc).
 *
 * Variants:
 * - "primary"   solid green fill, white text (default)
 * - "secondary" white fill, slate border, dark text
 * - "ghost"     no fill/border, used for inline text-links styled as buttons
 *
 * Sizes: "sm" | "md" (default) | "lg"
 */
const VARIANT_CLASSES = {
  primary:
    "bg-wc-primary text-wc-text-inverse border border-wc-primary hover:bg-wc-primary-dark hover:border-wc-primary-dark",
  secondary:
    "bg-wc-background text-wc-text-heading border border-wc-border hover:bg-wc-surface",
  ghost:
    "bg-transparent text-wc-text-heading border border-transparent hover:bg-wc-surface",
};

const SIZE_CLASSES = {
  sm: "h-wc-control-sm text-wc-sm px-wc-4 gap-wc-2",
  md: "h-wc-control-md text-wc-sm px-wc-button-x gap-wc-2",
  lg: "h-wc-control-lg text-wc-base px-wc-8 gap-wc-3",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  type = "button",
  as = "button",
  href,
  onClick,
  disabled = false,
  className = "",
  ...rest
}) {
  const classes = [
    "inline-flex items-center justify-center font-wc-medium font-wc-sans rounded-full",
    "transition-colors duration-wc-fast disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wc-border-focus focus-visible:ring-offset-2",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon icon={icon} className="shrink-0" aria-hidden="true" />
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} className="shrink-0" aria-hidden="true" />
      )}
    </>
  );

  if (as === "a") {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
