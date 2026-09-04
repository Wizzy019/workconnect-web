import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";
import { NavLink } from "react-router-dom";
import { SmartNavLink } from "../common/SmartNavLink";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "#how-it-works" },
  { label: "Find Work", path: "#find-work" },
  { label: "Hire Talent", path: "#hire-talent" },
];

/**
 * Navbar
 *
 * Top navigation: brand logo, primary links (with active-state support),
 * a "Log In" text link, and the "Get Started" primary CTA. Collapses to
 * a hamburger menu on mobile.
 *
 * activePath: which NAV_LINKS.path is currently active (defaults to "/")
 */
export default function Navbar({
  activePath = "/",
  onLoginClick,
  onGetStartedClick,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-wc-background border-b border-wc-border font-wc-sans">
      <div className="flex items-center justify-between h-[72px] px-wc-container md:px-wc-8">
        {/* Logo */}
        <a path="/" className="flex items-center gap-wc-2 shrink-0">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-wc-primary text-wc-lg"
            aria-hidden="true"
          />
          <span className="text-wc-base font-wc-semibold text-wc-text-heading">
            WorkConnect
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-wc-8">
          {NAV_LINKS.map((link) => {
            const isActive = link.path === activePath;
            return (
              <SmartNavLink
                key={link.path}
                to={link.path}
                className={
                  isActive
                    ? "text-wc-sm font-wc-medium text-wc-primary"
                    : "text-wc-sm font-wc-medium text-wc-text hover:text-wc-text-heading transition-colors duration-wc-fast"
                }
              >
                {link.label}
              </SmartNavLink>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-wc-6">
          <button
            type="button"
            onClick={onLoginClick}
            className="text-wc-sm font-wc-medium text-wc-text hover:text-wc-text-heading transition-colors duration-wc-fast"
          >
            Log In
          </button>
          <Button variant="primary" size="sm" onClick={onGetStartedClick}>
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-wc-text-heading text-wc-lg p-wc-2 -mr-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-wc-border px-wc-container py-wc-4 flex flex-col gap-wc-4 bg-wc-background">
          {NAV_LINKS.map((link) => {
            const isActive = link.path === activePath;
            return (
              <SmartNavLink
                key={link.path}
                to={link.path}
                className={
                  isActive
                    ? "text-wc-sm font-wc-medium text-wc-primary"
                    : "text-wc-sm font-wc-medium text-wc-text"
                }
              >
                {link.label}
              </SmartNavLink>
            );
          })}
          <button
            type="button"
            onClick={onLoginClick}
            className="text-wc-sm font-wc-medium text-wc-text text-left"
          >
            Log In
          </button>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={onGetStartedClick}
          >
            Get Started
          </Button>
        </nav>
      )}
    </header>
  );
}
