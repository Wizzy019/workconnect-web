import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const salaryRange = `$${job.salaryMin} - $${job.salaryMax}`;

  return (
    <div className="p-6 rounded-lg border bg-white border-gray-100 max-w-lg mx-auto">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
        <button
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Bookmark job"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <p className="text-gray-600 mb-4">{job.company} - {job. location}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          {job.type}
        </span>
        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          {job.workplace}
        </span>
        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          {job.setting}
        </span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex flex-col">
          <p className="text-xl font-bold text-gray-900">{salaryRange}</p>
          <div className="flex text-sm text-gray-500 mt-1 gap-4">
            <span className="flex items-center">
              {/* SVG for Clock Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.timePosted}
            </span>
            <span className="flex items-center">
              {/* SVG for User/Applicants Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {job.applicants} applicants
            </span>
          </div>
        </div>
         <Link to="/register/step-1" >
         <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition">
          Apply
        </button>
         </Link>
      </div>
    </div>
  );
};

export default JobCard;