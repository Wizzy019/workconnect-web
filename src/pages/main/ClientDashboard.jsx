import { faBriefcase, faPlus, faUpRightFromSquare, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const LargeCard = ({title, label, text, btText, box1, box2, box3, className=""}) => {
  return(
    <div className={`w-full p-4 bg-white rounded shadow-lg ${className}`}>
      {(title || label || text || btText) && (
      <div className="">
       {title && <>{title}</>} 
      {label && <>{label}</>}
      {text && <p>{text}</p>}
      {btText && <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition">
        {btText}</button>}
    </div>)}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {box1}
        {box2}
        {box3}
      </div>
    </div>
    )
}

const SmallCard = ({text, label, icon, iconText}) => (
  <div className="bg-white p-4">
    {text && <>{text}</>}
    {label && <p>{label}</p>}
    {(icon && iconText) && (<p><FontAwesomeIcon icon={icon} /> {iconText}</p>)}
  </div>
)

 const CardFlex = ({icon, text}) => (
    <div className="w-max flex  items-center justify-between">
      <div className="p-1 bg-[#a3ffcd28] mr-3"><FontAwesomeIcon icon={icon} /> </div>
      <p className="text-sm">{text}</p>
    </div>
  )
  const JobViewCard = ({label, text}) => (
    <div className="flex items-center justify-between">
    <div>
      <p className="font-medium">{label}</p>
      <p>{text}</p>
    </div>
   <button className="bg-emerald-600 text-white text-sm p-2 rounded-lg  hover:bg-emerald-700 transition">
        Manage</button>
    </div>
  )

function ClientDashboard() {
  return (
    <>
      <div className="flex items-center justify-between gap-3 p-4">
  <div className="flex flex-col gap-4">
    <LargeCard 
      label={<h2 className="font-semibold">Current Balance</h2>}
      text="$2,500.00"
      btText="Fund Wallet"
    />


    <LargeCard className="grid grid-cols-1"
      box1={<div className="flex flex-col">
      <CardFlex icon={faPlus} text="Post New Opportunity" />
      <CardFlex icon={faWallet} text="Fund Wallet" /> 
      <CardFlex icon={faBriefcase} text="View My Tasks" />
      </div>}
    />
  </div>

  <div className="flex flex-col gap-4 md:col-span-1 w-1/3">
    <SmallCard text="5" label="active jobs" />
    <SmallCard text="2" label="pending reviews" />
    <SmallCard icon={faUpRightFromSquare} iconText="Review Submissions" />
  </div>
</div>
<LargeCard className="grid grid-cols-1 justify-between"
 title={<h2 className="font-medium text-xl">My Active Jobs</h2>}
 box1={<div className="flex flex-col justify-center gap-3 ">
  <JobViewCard label="Design a Landing Page" text={`Design`} />
  <JobViewCard label={`Social Media Campaing`} text={`Marketing`} />
 </div>}

box2={
  <div className="flex flex-col justify-center gap-3 mr-10">
    <h2 className="font-medium text-xl">Submission Waiting for Review</h2>
<div className="w-full flex items-center justify-between">
          <div>
            <p className="font-medium">Landing Page Design</p> 
            <p>John Doe - May 2</p>
          </div>
          <button className="bg-emerald-600 text-white text-sm p-2 rounded-lg  hover:bg-emerald-700 transition">Review Now</button>
        </div>
  </div>
}
/>
    </>
  )
}

export default ClientDashboard
