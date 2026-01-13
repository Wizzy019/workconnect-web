import React from 'react';
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faLayerGroup, faChartLine, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ClientDashboard() {
  const { profile } = useAuth();

  const activeJobs = [
  ];

  return (
    <div className="w-full h-full flex flex-col animate-in fade-in duration-700 p-4">
      <section className="mb-10">
        <h1 className="text-4xl font-black text-[#001e2b] mb-2">
          Hello, {profile?.username || 'Arodike'}
        </h1>
        <div className="flex items-baseline gap-3">
          <span className="text-6xl font-black text-[#001e2b] tracking-tighter">$0.00</span>
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Budget Spent</span>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Hires</p>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <FontAwesomeIcon icon={faUsers} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-black text-[#001e2b]">0</h2>
            <span className="text-[11px] font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-lg">All time</span>
          </div>
        </div>

        <div className="bg-white p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Open Jobs</p>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#1dbf73]">
              <FontAwesomeIcon icon={faLayerGroup} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-black text-[#001e2b]">0</h2>
            <span className="text-[11px] font-bold text-[#1dbf73] bg-green-50 px-3 py-1 rounded-lg">
              <FontAwesomeIcon icon={faArrowUp} className="mr-1" /> 0 New
            </span>
          </div>
        </div>

        <div className="bg-white p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Project Velocity</p>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-black text-[#001e2b]">0%</h2>
            <span className="text-gray-400 text-[11px] font-medium">On Track</span>
          </div>
        </div>
      </div>

      <section className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-black text-2xl text-[#001e2b]">Active Recruitment</h2>
          <button className="text-sm font-bold text-gray-500 hover:text-[#1dbf73]">Manage All Jobs</button>
        </div>
        
        <div className="w-full">
          <div className="grid grid-cols-4 px-6 mb-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Title</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Applicants</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Budget Spent</span>
          </div>
          
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div key={job.id} className="grid grid-cols-4 items-center bg-white/50 p-6 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-white transition-all group">
                <span className="font-bold text-[#001e2b] text-sm">{job.title}</span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-black text-[#001e2b]">{job.apps}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Proposals</span>
                </div>
                <div className="flex justify-center">
                  <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase bg-blue-50 text-blue-500 tracking-tighter">
                    {job.status}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#001e2b] text-right">{job.spent}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientDashboard;