

function SmallCard({ children }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-center">
      {children}
    </div>
  );
}

export default SmallCard
