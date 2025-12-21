
function Topbar() {
  return (
    <div className="col-span-2 flex flex-col md:flex-row items-center min-h-20 py-5 px-2">
        <div className='w-full md:w-64 flex items-center justify-center md:justify-start'>
            <h1 className="w-max text-2xl font-bold text-primary">WorkConnect</h1>
        </div>
        <span className='mt-5 md:m-0 text-3xl font-bold'>Welcome Back, Wizzy</span>
      </div>
  )
}

export default Topbar
