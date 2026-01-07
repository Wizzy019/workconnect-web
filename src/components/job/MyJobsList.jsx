import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient/supabase";
import JobCard from "./JobCard";


const MyJobsList = () => {

  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

 useEffect(() => {
  const fetchJobs = async () => {
    if (!user) return;

    setLoading(true);
    setFetchError(null);

    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("client_id", user.id);

    if (error) setFetchError(error.message);
    else setJobs(data);

    setLoading(false);
  };

  fetchJobs();
}, [user]); 


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Jobs</h1>
        {jobs.length > 0 && (
           <Link to="/postjob">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95">
            <FontAwesomeIcon icon={faPlus} className="" />
            Post job
          </button>
          </Link>
        )}
      </div>
      <div>{fetchError}</div>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <FontAwesomeIcon icon={faPlus} className="text-slate-400" />
          </div>
          <p className="text-xl font-medium text-slate-600 mb-6">
            You haven't posted any Job yet
          </p>
          <Link to="/postjob">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95">
            Post your first job
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyJobsList;
