import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faHeart } from '@fortawesome/free-solid-svg-icons';

const TalentCard = ({ talent }) => {
  const {
    full_name,
    title,
    profile_image_url,
    cover_image_url,
    rating,
    reviews_count,
    starting_price,
    skills,
    is_vetted,
    offers_consultation
  } = talent;

  const avater = full_name.charAt(0).toUpperCase();

  return (
    <div className="max-w-[350px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 font-sans">
      <div className="relative">
        <img 
          src={cover_image_url || null} 
          alt="Banner" 
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 text-white/80 hover:text-white">
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <img 
            src={profile_image_url || null} 
            alt={avater} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm">{full_name}</span>
              {is_vetted && (
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  Vetted Pro
                </span>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-gray-700 text-sm leading-snug line-clamp-2 mb-3">
         {title} {skills.join(' ')}
        </h3>

        <div className="flex items-center gap-1 mb-1">
          <FontAwesomeIcon icon={faStar} className="text-gray-900 text-xs" />
          <span className="font-bold text-sm">{rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">({reviews_count})</span>
        </div>

        <div className="font-bold text-gray-900 text-base mb-3">
          From ${starting_price}
        </div>

        {offers_consultation && (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100 text-gray-600 text-xs">
            <FontAwesomeIcon icon={faVideo} />
            <span>Offers video consultations</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentCard;
