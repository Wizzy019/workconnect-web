import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * FormField
 *
 * Labeled input (or select) with a left-aligned icon and an optional
 * right-side element (e.g. a password visibility toggle). Shared by
 * LoginPage and SignupPage so form fields stay visually consistent.
 *
 * as: "input" (default) | "select"
 */
export default function FormField({
  id,
  label,
  icon,
  as = "input",
  type = "text",
  placeholder,
  value,
  onChange,
  rightElement,
  options,
  name,
  required = false,
}) {
  const fieldClasses =
    "w-full h-wc-control-lg pl-10 pr-10 rounded-wc-md border border-wc-border bg-wc-background text-wc-sm text-wc-text-heading placeholder:text-wc-text-muted focus:outline-none focus:ring-2 focus:ring-wc-border-focus focus:border-transparent transition-colors duration-wc-fast appearance-none";

  return (
    <div className="flex flex-col gap-wc-2 font-wc-sans">
      <label
        htmlFor={id}
        className="text-wc-sm font-wc-medium text-wc-text-heading"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-wc-text-muted text-sm pointer-events-none"
            aria-hidden="true"
          />
        )}

        {as === "select" ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={fieldClasses}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={fieldClasses}
          />
        )}

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
