import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faEye } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../../components/common/BackButton';
import TalentCard from '../../components/job/talentCard';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);

    if (user) {
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq("worker_id", user.id)
      
      const { data: gigsData } = await supabase
        .from('talents')
        .select('*')
        .eq("worker_id", user.id)

      setTasks(tasksData || []);
      setGigs(gigsData || []);
    }
    setLoading(false);
  };

   useEffect(() => {
    fetchData();
  }, []);

  if(loading) return <div>loading...</div>

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-10">
       <BackButton />
      <div className="max-w-xl mx-auto px-6 py-6 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10">
        <h1 className="flex-1 text-center text-2xl font-bold text-[#001e2b] mr-8">My Tasks</h1>
      </div>

      <div className="max-w-xl mx-auto px-6 pt-8 space-y-10">
        
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#001e2b]">Tasks you are working on</h2>
          {tasks.length > 0 ? (
            <div className="space-y-4">
                
            </div>
          ) : (
            <div className="bg-[#f7f7f7] rounded-xl border border-gray-200 py-12 flex flex-col items-center justify-center text-gray-500">
              <FontAwesomeIcon icon={faFolderOpen} className="text-5xl mb-4 opacity-20" />
              <p className="font-medium">You have no tasks yet</p>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#001e2b]">My Gigs</h2>
            <button className="text-[#1dbf73] border border-[#1dbf73] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#1dbf73] hover:text-white transition-all"
            onClick={() => navigate("/postgig")}
            >
              Post a New Gig
            </button>
          </div>

          {gigs.length > 0 ? (
            <div className="space-y-6">
              {gigs.map((gig) => (
                <div key={gig.id} className="relative bg-white border border-gray-200 rounded-xl overflow-hidden p-4 shadow-sm">
                   <div className="absolute top-4 right-4 bg-green-50 text-[#1dbf73] px-3 py-1 rounded-md text-xs font-bold uppercase">
                      Active
                   </div>
                   <TalentCard talent={gig} /> 
                   <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-gray-500 text-sm">
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      <span></span>
                   </div>
                </div>
              ))}
              <Link to="/postgig">
               <button className="w-full py-4 bg-[#1dbf73] text-white font-bold rounded-xl hover:bg-[#19a463] transition-colors"
              >
                Post another gig
              </button>
              </Link>
            </div>
          ) : (
            <div className="bg-[#f7f7f7] rounded-xl border border-gray-200 py-12 flex flex-col items-center justify-center text-gray-500">
              <FontAwesomeIcon icon={faFolderOpen} className="text-5xl mb-4 opacity-20" />
              <p className="font-medium">You have no gigs yet</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default MyTasks;