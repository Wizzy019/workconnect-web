import React, { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient/supabase";
import { useAuth } from "../../context/AuthContext";
import TalentCard from './talentCard';
import SearchBar from '../common/SearchBar';
import BackButton from '../common/BackButton';




const TalentList = () => {
  const { profile } = useAuth();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [filteredTalents, setFilteredTalents] = useState([]);

  const role = profile?.role;
  

  useEffect(() => {
    const fetchTalents = async () => {
      const { data, error } = await supabase
        .from('talents')
        .select('*');

      if (error) {
        setFetchError('Error fetching talents:', error);
      } else {
        setTalents(data);
      }
      setLoading(false);
    };

    fetchTalents();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading talent marketplace...</div>;
  }

  const handleSearch = (query) => {
    const filtered = talents.filter(talent => 
      talent.title.toLowerCase().includes(query.toLowerCase()) ||
      talent.full_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTalents(filtered);
  };

  return (
    <>
    <div>
      <BackButton to={`/dashboard/${role}`}/>
    </div>
     <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <SearchBar placeholder='Search Talent' onSearch={handleSearch}/>
        </div>
        {fetchError && <div className='text-re'>{fetchError}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {talents.map((talent) => (
        <TalentCard key={talent.id} talent={talent}/>
        ))}
      </div>
    </div>
    </>
  );
};

export default TalentList;