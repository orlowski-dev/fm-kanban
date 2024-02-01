export default function BoardsLoading() {
  return (
    <div>
      <h2 className="text-bodysm font-medium md:font-bold uppercase text-medium-grey px-6 lg:px-8 py-5">
        All boards
      </h2>
      <div className="px-6 py-3 lg:px-8 text-bodysm text-medium-grey flex items-center gap-3 transition-colors;">
        <div className="w-[1.125rem] h-[1.125rem] bg-medium-grey animate-pulse rounded-md"></div>
        <div className="w-[100px] h-[1.125rem] bg-medium-grey animate-pulse rounded-md"></div>
      </div>
      <div className="px-6 py-3 lg:px-8 text-bodysm text-medium-grey flex items-center gap-3 transition-colors;">
        <div className="w-[1.125rem] h-[1.125rem] bg-medium-grey animate-pulse rounded-md"></div>
        <div className="w-[100px] h-[1.125rem] bg-medium-grey animate-pulse rounded-md"></div>
      </div>
      <div className="px-6 py-3 lg:px-8 text-bodysm text-medium-grey flex items-center gap-3 transition-colors;">
        <div className="w-[1.125rem] h-[1.125rem] bg-medium-grey animate-pulse rounded-md"></div>
        <div className="w-[100px] h-[1.125rem] bg-medium-grey animate-pulse rounded-md"></div>
      </div>
    </div>
  );
}
