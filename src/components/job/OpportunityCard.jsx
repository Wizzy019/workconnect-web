import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUser,
  faChevronDown,
  faChevronUp,
  faPaperPlane,
  faBriefcase,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const bgColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-yellow-500",
];

const JobListingCard = ({
  opportunity,
  variant = "compact",
  randomBg = false,
  onOpen,
}) => {
  const { profile } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [proposal, setProposal] = useState("");
  const [delivery, setDelivery] = useState("");
  const [amount, setAmount] = useState("");

  const [bgColor] = useState(() =>
    randomBg
      ? bgColors[Math.floor(Math.random() * bgColors.length)]
      : "bg-wc-surface",
  );
  const isCompact = variant === "compact";

  const handleApply = (e) => {
    e.stopPropagation();
    setShowApplyModal(true);
  };

  const submitProposal = () => {
    setShowApplyModal(false);
  };

  const clientName = opportunity?.client?.name || "Unknown client";
  const clientImage = opportunity?.client?.profile_image_url;

  return (
    <>
      <article
        className={`
          ${bgColor}
          w-full
          rounded-wc-xl
          border border-wc-border
          shadow-wc-sm
          overflow-hidden
          transition-all duration-wc-base
          hover:shadow-wc-md
        `}
      >
        {/* Card Header */}
        <div className="p-wc-6">
          <div className="flex items-start justify-between gap-wc-4">
            <div className="flex items-start gap-wc-3 min-w-0">
              {/* Client Avatar */}
              <div className="shrink-0 size-11 rounded-full overflow-hidden bg-wc-primary-light flex items-center justify-center">
                {clientImage ? (
                  <img
                    src={clientImage}
                    alt={clientName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="text-wc-primary" />
                )}
              </div>

              {/* Client Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-wc-sm font-wc-semibold text-wc-text-heading truncate">
                    {clientName}
                  </p>

                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-wc-primary text-[11px] shrink-0"
                  />
                </div>

                <div className="flex items-center gap-2 mt-1 text-wc-xs text-wc-text-muted">
                  <FontAwesomeIcon icon={faBriefcase} />
                  <span>Job opportunity</span>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="text-right shrink-0">
              <p className="text-wc-xs text-wc-text-muted mb-1">Budget</p>

              <p className="text-wc-lg font-wc-bold text-wc-text-heading whitespace-nowrap">
                ₦{opportunity.budget}
              </p>
            </div>
          </div>

          {/* Job Title */}
          <div className="mt-wc-6">
            <h3 className="text-wc-xl font-wc-bold text-wc-text-heading leading-wc-tight">
              {opportunity.title}
            </h3>
          </div>

          {/* Skills */}
          {opportunity.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-wc-4">
              {(opportunity.skills || [])
                .slice(0, isCompact ? 3 : undefined)
                .map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="
                      px-wc-3 py-1.5
                      rounded-wc-md
                      bg-wc-primary-light
                      border border-wc-primary/10
                      text-wc-xs
                      font-wc-medium
                      text-wc-primary-dark
                    "
                  >
                    {skill}
                  </span>
                ))}
            </div>
          )}

          {/* Compact Variant */}
          {isCompact ? (
            <button
              onClick={() => onOpen?.(opportunity)}
              className="
                w-full
                mt-wc-6
                h-wc-control-md
                px-wc-button-x
                rounded-wc-md
                bg-wc-primary
                text-wc-text-inverse
                text-wc-sm
                font-wc-semibold
                transition-all duration-wc-fast
                hover:bg-wc-primary-dark
                focus:outline-none
                focus:ring-2
                focus:ring-wc-primary/30
              "
            >
              Open
            </button>
          ) : (
            <>
              {/* Expanded Information */}
              <div className="mt-wc-6">
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="
                    flex items-center gap-2
                    text-wc-sm
                    font-wc-semibold
                    text-wc-text-muted
                    hover:text-wc-primary
                    transition-colors
                  "
                >
                  <span>{isExpanded ? "Collapse" : "View"}</span>

                  <FontAwesomeIcon
                    icon={isExpanded ? faChevronUp : faChevronDown}
                    className="text-[10px]"
                  />
                </button>

                {isExpanded && (
                  <div className="mt-wc-5 pt-wc-5 border-t border-wc-border">
                    {/* Description */}
                    <div className="mb-wc-6">
                      <p className="text-wc-sm text-wc-text-muted leading-wc-relaxed">
                        {opportunity.description}
                      </p>
                    </div>

                    {/* Job Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-wc-4 mb-wc-6">
                      {/* Posted By */}
                      <div className="flex items-center gap-wc-3">
                        <div className="shrink-0 size-9 rounded-full overflow-hidden bg-wc-primary-light flex items-center justify-center">
                          {clientImage ? (
                            <img
                              src={clientImage}
                              alt={clientName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-wc-primary text-sm"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-wc-xs font-wc-medium text-wc-text-muted">
                            Posted by
                          </p>

                          <p className="text-wc-sm font-wc-semibold text-wc-text-heading truncate">
                            {clientName}
                          </p>
                        </div>
                      </div>
                      {/* Deadline */}
                      <div className="flex items-center gap-wc-3">
                        <div className="shrink-0 size-9 rounded-full bg-wc-primary-light flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-wc-primary text-sm"
                          />
                        </div>

                        <div>
                          <p className="text-wc-xs font-wc-medium text-wc-text-muted">
                            Deadline
                          </p>

                          <p className="text-wc-sm font-wc-semibold text-wc-text-heading">
                            {opportunity.deadline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Apply */}
                    <button
                      onClick={handleApply}
                      className="
                        w-full
                        h-wc-control-lg
                        px-wc-button-x
                        rounded-wc-md
                        bg-wc-primary
                        text-wc-text-inverse
                        text-wc-sm
                        font-wc-semibold
                        flex items-center justify-center gap-2
                        transition-all duration-wc-fast
                        hover:bg-wc-primary-dark
                        focus:outline-none
                        focus:ring-2
                        focus:ring-wc-primary/30
                      "
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </article>

      {/* Apply Modal */}
      {showApplyModal && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            p-4
            bg-black/50
            backdrop-blur-sm
          "
        >
          <div className="bg-wc-surface w-full max-w-md rounded-wc-xl shadow-wc-md overflow-hidden">
            {/* Modal Header */}
            <div className="p-wc-6 border-b border-wc-border">
              <div className="flex items-center gap-wc-3">
                <div className="shrink-0 size-12 rounded-full overflow-hidden bg-wc-primary-light flex items-center justify-center">
                  {profile?.profile_image_url ? (
                    <img
                      src={profile.profile_image_url}
                      alt={profile?.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-wc-primary"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="text-wc-base font-wc-bold text-wc-text-heading truncate">
                    {profile?.name || "Your profile"}
                  </h4>

                  <p className="text-wc-xs text-wc-text-muted mt-1">
                    Applying for {opportunity.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Form */}
            <div className="p-wc-6 space-y-wc-4">
              <div>
                <label className="text-wc-xs font-wc-semibold text-wc-text-muted uppercase">
                  Proposal / Cover Letter
                </label>

                <textarea
                  rows="4"
                  className="w-full mt-2
                    p-wc-3
                    bg-wc-background
                    border border-wc-border
                    rounded-wc-md
                    outline-none
                    focus:border-wc-border-focus
                    focus:ring-1 focus:ring-wc-primary/20
                    text-wc-sm
                    text-wc-text
                    resize-none
                  "
                  placeholder="Explain why you are the best fit..."
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-wc-4">
                <div>
                  <label className="text-wc-xs font-wc-semibold text-wc-text-muted uppercase">
                    Delivery Time
                  </label>

                  <input
                    type="text"
                    className="
                      w-full mt-2
                      h-wc-control-md
                      px-wc-3
                      bg-wc-background
                      border border-wc-border
                      rounded-wc-md
                      outline-none
                      focus:border-wc-border-focus
                      focus:ring-1 focus:ring-wc-primary/20
                      text-wc-sm
                      text-wc-text
                    "
                    placeholder="e.g. 5 days"
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-wc-xs font-wc-semibold text-wc-text-muted uppercase">
                    Proposed Amount (₦)
                  </label>

                  <input
                    type="text"
                    className="
                      w-full mt-2
                      h-wc-control-md
                      px-wc-3
                      bg-wc-background
                      border border-wc-border
                      rounded-wc-md
                      outline-none
                      focus:border-wc-border-focus
                      focus:ring-1 focus:ring-wc-primary/20
                      text-wc-sm
                      text-wc-text
                    "
                    placeholder={opportunity.budget}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-wc-6 bg-wc-background flex gap-wc-3">
              <button
                onClick={submitProposal}
                className="
                  flex-1
                  h-wc-control-lg
                  rounded-wc-md
                  bg-wc-primary
                  text-wc-text-inverse
                  text-wc-sm
                  font-wc-semibold
                  hover:bg-wc-primary-dark
                  transition-colors
                "
              >
                Submit Proposal
              </button>

              <button
                onClick={() => setShowApplyModal(false)}
                className="
                  flex-1
                  h-wc-control-lg
                  rounded-wc-md
                  bg-wc-surface
                  border border-wc-border
                  text-wc-text-muted
                  text-wc-sm
                  font-wc-semibold
                  hover:bg-wc-background
                  transition-colors
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobListingCard;
