const ColumnLoading = () => {
  return (
    <div
      className="grid gap-6 mx-auto animate-pulse"
      style={{
        gridTemplateColumns: `repeat(3, 17.5rem)`,
        width: `calc(17.5rem * 3 + 1.5rem * 3)`,
      }}
    >
      <div>
        <div className="bg-white dark:bg-dark-grey transition-colors mb-4 h-6 w-12 rounded-md"></div>
        <div className="grid gap-3">
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
        </div>
      </div>
      <div>
        <div className="bg-white dark:bg-dark-grey transition-colors mb-4 h-6 w-12 rounded-md"></div>
        <div className="grid gap-3">
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
        </div>
      </div>
      <div>
        <div className="bg-white dark:bg-dark-grey transition-colors mb-4 h-6 w-12 rounded-md"></div>
        <div className="grid gap-3">
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
          <div className="bg-white dark:bg-dark-grey transition-colors h-24 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ColumnLoading;
