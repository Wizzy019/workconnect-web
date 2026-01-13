import React, { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faBriefcase, faStar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import OpportunityCard from '../../components/job/OpportunityCard';
import { supabase } from '../../lib/supabaseClient/supabase';

function WorkerDashboard() {
  const { profile } = useAuth();
  const [hotJobs, setHotJobs] = useState([]);

 
  useEffect(() => {
    const getHotJobs = async () => {

      const {data, error} = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false})
      .limit(6)
     if(error) throw error

     setHotJobs(data);
    }
     

   getHotJobs()
  },[])


  return (
    <div className="animate-in fade-in duration-700 p-2">
      <section className="mb-10">
        <h1 className="text-3xl font-black text-[#001e2b] mb-2">
          Welcome back, {profile?.username || 'Freelancer'}
        </h1>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-black text-[#1dbf73] tracking-tighter">₦0.00</span>
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Wallet Balance</span>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Active Tasks</p>
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1dbf73]">
              <FontAwesomeIcon icon={faBriefcase} size="sm" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-black text-[#001e2b]">0</h2>
            <span className="text-[11px] font-bold text-[#1dbf73] bg-green-50 px-2 py-1 rounded-lg">
              <FontAwesomeIcon icon={faArrowUp} className="mr-1" /> 0%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Success Rate</p>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
              <FontAwesomeIcon icon={faCheckCircle} size="sm" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-black text-[#001e2b]">0%</h2>
            <span className="text-gray-400 text-[11px] font-medium">No Rating Yet</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Avg. Rating</p>
            <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-500">
              <FontAwesomeIcon icon={faStar} size="sm" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-black text-[#001e2b]">0.00</h2>
            <div className="flex text-yellow-400 text-[10px]">
               <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} />
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-xl text-[#001e2b]">Hot Opportunities</h2>
          <button className="text-sm font-bold text-[#1dbf73] hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotJobs.map(job => (
            <OpportunityCard 
              key={job.id} 
              opportunity={job} 
              variant="compact" 
              randomBg={true} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WorkerDashboard;