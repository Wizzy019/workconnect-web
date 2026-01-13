import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faPlus, faExchangeAlt, faHistory,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import BackButton from '../../components/common/BackButton';

const Wallet = () => {
  const [filter, setFilter] = useState('All');

  const transactions = [
   
  ];

  return (
    <div className="min-h-screen bg-[#f3f7f9] pb-12">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm border-x border-gray-100">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <BackButton/>
          <h2 className="text-xl font-bold text-[#001e2b]">Wallet</h2>
          <div className="w-6"></div>
        </div>

        <div className="p-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
            <p className="text-gray-500 font-medium mb-2">Current Balance</p>
            <h1 className="text-5xl font-black text-[#001e2b] mb-8">0.00</h1>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 px-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
                Withdraw
              </button>
              <button className="py-3 px-4 bg-[#1dbf73] text-white rounded-xl font-bold hover:bg-[#19a463] shadow-md transition-all">
                Deposit
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#1dbf73] transition-all group">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1dbf73] mb-2 group-hover:bg-[#1dbf73] group-hover:text-white transition-all">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <span className="text-[11px] font-bold text-[#001e2b]">Add Funds</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#1dbf73] transition-all group">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1dbf73] mb-2 group-hover:bg-[#1dbf73] group-hover:text-white transition-all">
              <FontAwesomeIcon icon={faExchangeAlt} />
            </div>
            <span className="text-[11px] font-bold text-[#001e2b]">Transfer</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#1dbf73] transition-all group">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1dbf73] mb-2 group-hover:bg-[#1dbf73] group-hover:text-white transition-all">
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <span className="text-[11px] font-bold text-[#001e2b]">Methods</span>
          </button>
        </div>

        <div className="mt-8 px-6 pb-10">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm min-h-[400px]">
            <h3 className="text-lg font-bold text-[#001e2b] mb-4">Transaction History</h3>
            
            <div className="flex gap-2 mb-6">
              {['All', 'Earnings', 'Withdrawals'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setFilter(btn)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    filter === btn 
                    ? 'bg-[#1dbf73] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {transactions.length > 0 ? (
                    transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
              <FontAwesomeIcon icon={tx.icon} className="text-sm" />
            </div>
             <div>
             <h4 className="text-sm font-bold text-[#001e2b]">{tx.title}</h4>
             <p className="text-[11px] text-gray-400">{tx.date}</p>
              </div>
             </div>
        <div className="text-right">
          <p className={`font-bold text-sm ${tx.amount > 0 ? 'text-[#1dbf73]' : 'text-red-500'}`}>
               {tx.amount > 0 ? `+ $${tx.amount.toFixed(2)}` : `- $${Math.abs(tx.amount).toFixed(2)}`}
               </p>
             </div>
        </div>
           ))
              ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <FontAwesomeIcon 
          icon={faHistory} 
          className="text-3xl text-gray-200" 
        />
      </div>
      <h4 className="text-[#001e2b] font-bold text-sm">No transaction history</h4>
      <p className="text-xs text-gray-400 mt-1 px-8">
        Your earnings and spending will appear here once you start using your wallet.
      </p>
             </div>
             )}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-[#1dbf73] hover:underline transition-all">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;