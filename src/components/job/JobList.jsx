import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient/supabase";
import OpportunityCard from "../job/OpportunityCard";
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setFetchError(null);

      const { data, error } = await supabase
        .from("workconnect_opportunities")
        .select(`*, client:workconnect_profiles(id, name, profile_image_url)`);

      if (error) {
        setFetchError(error.message);
        console.log(error);
      } else setJobs(data);

      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <>
      {loading && <p className="text-xl">Loading...</p>}
      {fetchError && (
        <p className="text-red-500 text-sm"> Error fetching Opportunities</p>
      )}
      <div className="grid md:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <opportunityC
            key={job.id}
            opportunity={job}
            variant="expanded"
            randomBg={false}
          />
        ))}
      </div>
    </>
  );
}

export default JobList;
