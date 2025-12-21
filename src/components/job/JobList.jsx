import { useEffect, useState } from "react"
import JobCard from "./JobCard"


function JobList() {

     const [jobs, setJobs] = useState([]);

     useEffect(() => {
      const fetchJobs = async () => {
        const res = await fetch("/Others/JSON DATA/jobs.json");
        const data = await res.json();
        setJobs(data.jobs)
      }

      fetchJobs();

     }, [])
     

  return (
    <div className="grid md:grid-cols-4 gap-4 bg-[#a3ffcd28]">
       {jobs.map(job => (
        <JobCard key={job.id} job={job} />
       ))}
    </div>
  )
}

export default JobList
