import BackButton from "../../components/common/BackButton"
import JobList from "../../components/job/JobList"
// import JobSearchForm from "../../components/job/JobSearchForm"

function Jobs() {

  return (
    <div className="p-4 bg-[#a3ffcd28]">
      <BackButton />
        {/* <JobSearchForm /> */}
        <JobList />
    </div>
  )
}

export default Jobs
