import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const LINK_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Find Work", href: "#find-work" },
      { label: "Hire Talent", href: "#hire-talent" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Log In", href: "#login" },
      { label: "Get Started", href: "#get-started" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: faLinkedin, label: "LinkedIn", href: "#" },
  { icon: faXTwitter, label: "X (Twitter)", href: "#" },
  { icon: faInstagram, label: "Instagram", href: "#" },
];

/**
 * Footer
 *
 * Site footer: brand block with tagline and social links, three columns
 * of navigation links, and a copyright line.
 */
export default function Footer({ year = new Date().getFullYear() }) {
  return (
    <footer className="w-full bg-wc-surface-dark text-wc-text-inverse py-wc-12 font-wc-sans">
      <div className="mx-auto px-wc-container md:px-wc-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-wc-12">
          <div>
            <div className="flex items-center gap-wc-2 mb-wc-3">
              <FontAwesomeIcon
                icon={faUserGroup}
                className="text-wc-primary text-wc-lg"
                aria-hidden="true"
              />
              <span className="text-wc-base font-wc-semibold text-wc-text-inverse">
                WorkConnect
              </span>
            </div>
            <p className="text-wc-sm text-wc-text-muted max-w-xs mb-wc-4">
              Connecting skilled workers with meaningful opportunities.
            </p>
            <div className="flex items-center gap-wc-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-wc-text-muted hover:text-wc-text-inverse transition-colors duration-wc-fast"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="text-wc-sm font-wc-semibold text-wc-text-inverse mb-wc-3">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-wc-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-wc-sm text-wc-text-muted hover:text-wc-text-inverse transition-colors duration-wc-fast"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-wc-12 pt-wc-6">
          <p className="text-wc-xs text-wc-text-muted">
            © {year} WorkConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
