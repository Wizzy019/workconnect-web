import Card from "../../components/common/Card"

const CardBox = ({ label, text}) => (
  <div className="flex items-center justify-between text-sm">
    <span>
      <h3 className="font-medium ">{label}</h3>
      <p>{text}</p>
    </span>
    <button className=" border border-emerald-600 text-emerald-600 p-1 rounded-lg hover:bg-emerald-50">View Details</button>
  </div>
)


function Dashboard() {
  return (
    <>
    <div className="grid grid-cols-2 md:flex items-center justify-between md:justify-stretch gap-2 md:gap-3 p-4">
      <Card className="min-w-35 md:w-110 h-30 p-4" 
      title={<h1 className="font-medium">Available Balance</h1>}
      text={<h3 className="font-semibold text-2xl">0.00</h3>}
      action={<button className="bg-emerald-600 text-white p-2 rounded-lg font-medium hover:bg-gray-700 transition">
        Withdrawl/Fund
      </button>}
      />
      <Card className="min-w-40 h-30 p-4 text-xl font-medium" 
      label={<h3>0</h3>}
      text={<p>total tasks completed</p>}
      />
    </div>
    <div className="flex gap-4 p-4">
      <Card className="min-w-80 md:w-150 min-h-80 flex flex-1 flex-col justify-between p-4" 
    title={<h1 className="font-semibold text-xl">Active Opportunities</h1>}
    box={<>
       <CardBox label="Design a Landing Page" text="500 - 1500 Design" />
    <CardBox label="Social Media Management" text="800 Marketing" /><CardBox label="Content Writing" text="1200 Content Wrnt Writing" />
    </>}
    />
    <Card className="min-w-65 md:flex flex-col justify-between gap-3 p-4 hidden "
    title={<h2 className="text-2xl font-semibold">Notifcations</h2>}
    text1={<p>Your work was approved</p>}
    text2={<p>New opportunity posted in your category</p>}
    text3={<p>Complete ur profile to unlock more tasks</p>}
    />
    </div>
    </>
  )
}

export default Dashboard
