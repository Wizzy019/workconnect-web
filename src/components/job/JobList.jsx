import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient/supabase";
import JobCard from "./JobCard"


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
          .select("*");
    
        if (error) setFetchError(error.message);
        else setJobs(data);
    
        setLoading(false);
      };
    
      fetchJobs();
    }, []);
     

  return (
    <> 
    <div className="grid md:grid-cols-4 gap-4 bg-[#a3ffcd28]">
       {jobs.map(job => (
        <JobCard key={job.id} job={job} />
       ))}
    </div>
    </>
  )
}

export default JobList
