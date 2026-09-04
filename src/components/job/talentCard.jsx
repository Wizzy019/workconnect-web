import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faLocationDot,
  faStar,
  faBriefcase,
  faArrowRight,
  faHeart,
  faEllipsisVertical,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const TalentCard = ({ talent, isOwnerView = false, onUpdate, onDelete }) => {
  const {
    id,
    full_name,
    title,
    description,
    profile_image_url,
    rating,
    reviews_count,
    starting_price,
    skills = [],
    is_vetted,
    offers_consultation,
    country,
  } = talent;

  const avatar = full_name?.charAt(0).toUpperCase() || "?";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    title: title || "",
    starting_price: starting_price || "",
    skills: Array.isArray(skills) ? [...skills] : [],
  });

  const handleSave = () => {
    onUpdate?.({
      ...talent,
      title: formData.title,
      starting_price: formData.starting_price,
      skills: formData.skills,
    });

    setIsEditing(false);
    setMenuOpen(false);
  };

  const handleSkillKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();

      const newSkill = skillInput.trim().replace(",", "");

      if (!formData.skills.includes(newSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill],
        }));
      }

      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const location = country || "Location not specified";

  return (
    <div className="relative w-full max-w-wc-content-sm bg-wc-background border border-wc-border rounded-wc-lg shadow-wc-sm p-wc-6 font-wc-sans">
      {/* OWNER MENU */}
      {isOwnerView && (
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-8 h-8 flex items-center justify-center rounded-wc-sm text-wc-text-muted hover:bg-wc-surface hover:text-wc-text-heading transition-colors duration-wc-fast"
            aria-label="Talent options"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-wc-background border border-wc-border rounded-wc-md shadow-wc-md overflow-hidden z-30">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-wc-3 py-2 text-wc-sm text-wc-text-heading hover:bg-wc-surface transition-colors"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  onDelete?.(id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-wc-3 py-2 text-wc-sm text-red-600 hover:bg-wc-surface transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {!isEditing ? (
        <>
          {/* HEADER */}
          <div className="flex items-start gap-wc-4">
            {/* PROFILE IMAGE */}
            <div className="w-16 h-16 rounded-full bg-wc-primary-light overflow-hidden flex items-center justify-center shrink-0">
              {profile_image_url ? (
                <img
                  src={profile_image_url}
                  alt={full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-wc-lg font-wc-semibold text-wc-primary">
                  {avatar}
                </span>
              )}
            </div>

            {/* NAME + TITLE */}
            <div className="min-w-0 flex-1 pr-8">
              <div className="flex items-center gap-wc-2">
                <h3 className="text-wc-lg font-wc-semibold text-wc-text-heading truncate">
                  {full_name}
                </h3>

                {is_vetted && (
                  <span className="inline-flex items-center gap-1 text-wc-xs font-wc-medium text-wc-primary bg-wc-primary-light px-wc-2 py-0.5 rounded-wc-sm shrink-0">
                    Verified
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-[10px]"
                    />
                  </span>
                )}
              </div>

              <p className="text-wc-sm text-wc-text mt-1">{title}</p>

              <p className="text-wc-sm text-wc-text flex items-center gap-wc-1 mt-1">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-xs text-wc-text-muted"
                />
                {location}
              </p>
            </div>

            {/* FAVORITE */}
            {!isOwnerView && (
              <button
                type="button"
                className="absolute top-5 right-5 text-wc-text-muted hover:text-wc-primary transition-colors"
                aria-label="Save talent"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            )}
          </div>

          {/* RATING */}
          <div className="flex items-center gap-wc-2 mt-wc-4">
            <FontAwesomeIcon icon={faStar} className="text-[#f59e0b] text-sm" />

            <span className="text-wc-sm font-wc-semibold text-wc-text-heading">
              {Number(rating || 0).toFixed(1)}
            </span>

            <span className="text-wc-sm text-wc-text-muted">
              ({reviews_count || 0} reviews)
            </span>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-wc-border my-wc-4" />

          {/* SKILLS */}
          <p className="text-wc-sm font-wc-semibold text-wc-text-heading mb-wc-3">
            Skills
          </p>

          <div className="flex flex-wrap gap-wc-2 mb-wc-4">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="text-wc-sm px-wc-3 py-1.5 rounded-wc-sm bg-wc-surface text-wc-text-heading border border-wc-border"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-wc-sm text-wc-text-muted">
                No skills listed
              </span>
            )}
          </div>

          {/* DIVIDER */}
          <div className="border-t border-wc-border my-wc-4" />

          {/* EXPERIENCE / DESCRIPTION */}
          <p className="text-wc-sm font-wc-semibold text-wc-text-heading mb-wc-2">
            Experience
          </p>

          <div className="flex items-start gap-wc-2 mb-wc-4">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="text-wc-primary text-sm mt-0.5"
            />

            <div className="min-w-0">
              <p className="text-wc-sm text-wc-text-heading">
                {description || "Experienced professional"}
              </p>
              {starting_price && (
                <p className="text-wc-sm text-wc-text mt-1">
                  Starting from{" "}
                  <span className="font-wc-semibold text-wc-text-heading">
                    ₦{starting_price}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* CONSULTATION */}
          {offers_consultation && (
            <div className="flex items-center gap-wc-2 mb-wc-4 text-wc-sm text-wc-text">
              <FontAwesomeIcon icon={faVideo} className="text-wc-primary" />
              <span>Offers video consultations</span>
            </div>
          )}

          {/* ACTION */}
          <button
            type="button"
            className="w-full h-wc-control-md inline-flex items-center justify-center gap-wc-2 bg-wc-primary text-wc-text-inverse rounded-wc-md font-wc-medium text-wc-sm hover:bg-wc-primary-dark transition-colors duration-wc-fast"
          >
            View Profile
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>
        </>
      ) : (
        /* =========================
           EDIT MODE
        ========================== */
        <div className="space-y-wc-4">
          <div>
            <label className="block text-wc-sm font-wc-semibold text-wc-text-heading mb-2">
              Title
            </label>

            <input
              className="w-full px-wc-3 h-wc-control-md bg-wc-background border border-wc-border rounded-wc-md text-wc-sm text-wc-text-heading outline-none focus:border-wc-primary transition-colors"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              placeholder="Professional title"
            />
          </div>

          <div>
            <label className="block text-wc-sm font-wc-semibold text-wc-text-heading mb-2">
              Starting price
            </label>

            <input
              className="w-full px-wc-3 h-wc-control-md bg-wc-background border border-wc-border rounded-wc-md text-wc-sm text-wc-text-heading outline-none focus:border-wc-primary transition-colors"
              type="number"
              value={formData.starting_price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  starting_price: e.target.value,
                })
              }
              placeholder="Starting price"
            />
          </div>

          <div>
            <label className="block text-wc-sm font-wc-semibold text-wc-text-heading mb-2">
              Skills
            </label>

            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Add a skill and press Enter..."
              className="w-full px-wc-3 h-wc-control-md bg-wc-background border border-wc-border rounded-wc-md text-wc-sm text-wc-text-heading outline-none focus:border-wc-primary transition-colors"
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-wc-sm px-3 py-1.5 rounded-wc-sm bg-wc-primary-light text-wc-primary hover:bg-wc-primary hover:text-wc-text-inverse transition-colors"
                  title="Remove skill"
                >
                  {skill} ×
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-wc-2 pt-wc-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 h-wc-control-md bg-wc-primary text-wc-text-inverse text-wc-sm font-wc-medium rounded-wc-md hover:bg-wc-primary-dark transition-colors"
            >
              Save changes
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 h-wc-control-md border border-wc-border text-wc-sm font-wc-medium text-wc-text-heading rounded-wc-md hover:bg-wc-surface transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentCard;
