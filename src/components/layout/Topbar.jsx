import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function Topbar() {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-0 bg-transparent">
      
      <div className="flex flex-col">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
          <span>Campaigns</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#001e2b]">Analytics</span>
        </nav>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto md:min-w-[400px]">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon icon={faSearch} className="text-sm" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-white border border-gray-100 rounded-xl py-2.5 pl-11 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#1dbf73]/10 transition-all shadow-sm shadow-gray-100/50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 border border-gray-100 rounded bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            ⌘ /
          </div>
        </div>

        <button className="h-10 px-4 flex items-center gap-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-[#001e2b] hover:bg-gray-50 transition-colors shadow-sm shadow-gray-100/50">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
          <span className="hidden sm:inline">Select Dates</span>
        </button>

        <button className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-[#1dbf73] transition-colors shadow-sm shadow-gray-100/50">
          <FontAwesomeIcon icon={faSlidersH} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;