import React, { useState } from 'react';

  const Dropdown = ({ label, options }) => (
    <div className="relative w-full">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:border-gray-500"
        aria-label={label}
      >
        <option value="" disabled select="true" hidden>{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

const JobSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

 
  const locations = [
    "Awka", "Onitsha", "Owerri", "Aba", "Nnewi", "Umuahia",
    "Enugu", "Abakaliki", "Orlu"
  ];


  const categories = [
    "Product Design", "UI/UX Design", "Mobile Development",
    "Web Development", "Software Engineering / Backend",
    "Frontend Development", "Data Science / Analytics",
    "Marketing / Digital Marketing", "Sales / Business Development",
    "Human Resources", "Customer Support", "Finance / Accounting",
    "Operations / Project Management", "Content / Copywriting"
  ];


  const salaryRanges = [
    "$0 – $30,000", "$30,001 – $50,000", "$50,001 – $70,000",
    "$70,001 – $90,000", "$90,001 – $110,000", "$110,001 – $140,000",
    "$140,001 – $180,000", "$180,001 – $220,000", "$220,001+"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for jobs...');
  };



  return (
    <div className="p-6 rounded-lg max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-3/4">
            <Dropdown label="Location" options={locations} />
            <Dropdown label="Category" options={categories} />
            <Dropdown label="Salary Range" options={salaryRanges} />
          </div>
          <div className="w-full md:w-1/4">
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default JobSearchForm
