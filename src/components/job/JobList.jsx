import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient/supabase";
import OpportunityCard from "./OpportunityCard";


function JobList() {

     const [jobs, setJobs] = useState([]);
     const [fetchError, setFetchError] = useState("");
     const [loading, setLoading] = useState("");

    useEffect(() => {
      const fetchJobs = async () => {
    
        setLoading(true);
        setFetchError(null);
    
        const { data, error } = await supabase
          .from("opportunities")
          .select(`*, client:profiles(id, name, profile_image_url)`);
    
        if (error) setFetchError(error.message);
        else setJobs(data);
    
        setLoading(false);
      };
    
      fetchJobs();
    }, []);

  return (
    <> 
    <div className="grid md:grid-cols-4 gap-4">
       {jobs.map(job => (
        <OpportunityCard key={job.id} opportunity={job} variant="expanded" randomBg={false}/>
       ))}
    </div>
    </>
  )
}

export default JobList
