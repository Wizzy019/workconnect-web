

const JobCard = ({ job }) => {
  const statusStyles = {
    Open: "bg-teal-50 text-teal-700",
    "In Progress": "bg-blue-50 text-blue-700",
    Completed: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-slate-800">{job?.title || "Build a Landing Page"}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[job?.status] || statusStyles.Open}`}>
          {job?.status || "Open"}
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-slate-600">
          Budget: <span className="font-medium text-slate-900">${job?.budget?.toLocaleString() || "1,200"}</span>
        </p>
        
        <div className="flex items-center gap-2 text-slate-700 py-1">
          <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span className="font-semibold text-lg">{job?.talent || "Not assigned"}</span>
        </div>
        
        <p className="text-sm text-slate-400">
          Posted on {job?.date || "April 22, 2024"}
        </p>
      </div>

      <div className="flex justify-end mt-2">
        <button className="px-6 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-green-500 transition-colors">
          View Job
        </button>
      </div>
    </div>
  );
};

export default JobCard;