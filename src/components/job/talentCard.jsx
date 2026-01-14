import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faVideo,
  faHeart,
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';

const TalentCard = ({
  talent,
  isOwnerView = false,
  onUpdate,
  onDelete
}) => {
  const {
    full_name,
    title,
    description,
    profile_image_url,
    cover_image_url,
    rating,
    reviews_count,
    starting_price,
    skills,
    is_vetted,
    offers_consultation
  } = talent;

  const avatar = full_name.charAt(0).toUpperCase();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("")

  const [formData, setFormData] = useState({
    title,
    starting_price,
    skills: skills.join(', ')
  });

  const handleSave = () => {
    onUpdate?.({
      ...talent,
      title: formData.title,
      starting_price: formData.starting_price,
      skills: formData.skills.map(s => s.trim())
    });
    setIsEditing(false);
    setMenuOpen(false);
  };

  const handleSkillKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim().replace(',', '');
      if (!formData.skills.includes(newSkill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
      }
      setSkillInput('');
    }
  };

  return (
    <div className="max-w-[350px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 font-sans relative">
      <div className="relative">
        <img
          src={cover_image_url || null}
          alt="Banner"
          className="w-full h-48 object-cover"
        />

        <button className="absolute top-3 right-3 text-white/80 hover:text-white">
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </button>

        {isOwnerView && (
          <div className="absolute top-3 left-3">
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="text-white/80 hover:text-white"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>

            {menuOpen && (
              <div className="absolute mt-2 w-32 bg-white rounded-lg shadow-md border text-sm z-10">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(talent.id)}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        {!isEditing ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={profile_image_url || null}
                alt={avatar}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">
                    {full_name}
                  </span>
                  {is_vetted && (
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      Vetted Pro
                    </span>
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-gray-700 text-sm line-clamp-2 mb-3 font-medium">
              {title}
            </h3>
            <div className='text-gray-700 text-sm line-clamp-2 mb-3 font-medium'>
          Skills: {skills.join(', ')}
            </div>
            <div className='text-gray-700 text-sm line-clamp-2 mb-3'>
            <p>{description}</p>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <FontAwesomeIcon icon={faStar} className="text-gray-900 text-xs" />
              <span className="font-bold text-sm">{rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">
                ({reviews_count})
              </span>
            </div>

            <div className="font-bold text-gray-900 text-base mb-3">
              From ₦{starting_price}
            </div>

            {offers_consultation && (
              <div className="flex items-center gap-2 pt-3 border-t text-gray-600 text-xs">
                <FontAwesomeIcon icon={faVideo} />
                <span>Offers video consultations</span>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={formData.title}
              onChange={e =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Title"
            />

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              type="number"
              value={formData.starting_price}
              onChange={e =>
                setFormData({ ...formData, starting_price: e.target.value })
              }
              placeholder="Starting price"
            />

           <div className="space-y-2">
                <label className="text-sm font-bold text-[#001e2b]">Skills</label>
                       <input 
                         value={skillInput}
                         onChange={(e) => setSkillInput(e.target.value)}
                         onKeyDown={handleSkillKeyDown}
                         placeholder="Add a skill and press Enter..."
                         className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all"
                       />
                     </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-[#1dbf73] text-white text-sm py-2 rounded"
              >
                Save changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 border text-sm py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentCard;