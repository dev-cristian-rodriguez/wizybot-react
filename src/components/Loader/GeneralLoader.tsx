// General loader component
const GeneralLoader = () => {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary-color rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary-color rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary-color rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-xs text-gray-500 ml-1">Wizybot is typing...</span>
    </div>
  );
};

export default GeneralLoader;
