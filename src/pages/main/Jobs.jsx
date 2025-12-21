import JobList from "../../components/job/JobList"
import JobSearchForm from "../../components/job/JobSearchForm"

function Jobs() {

  return (
    <div className="p-4 bg-white">
        <JobSearchForm />
        <JobList />
    </div>
  )
}

export default Jobs
