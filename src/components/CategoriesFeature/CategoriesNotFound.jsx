import { ImageOff } from "lucide-react";

const CategoriesNotFound = ({ onClear }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-white shadow-sm">
      <ImageOff className="w-10 h-10 text-gray-400 mb-4" />
      <h2 className="text-lg font-semibold text-gray-800">
        No Category match your search
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Try different keywords or clear your search.
      </p>
      <button
        onClick={onClear}
        className="mt-6 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-6 py-2 rounded-md shadow-md transition-colors"
      >
        Clear Search
      </button>
    </div>
  );
};

export default CategoriesNotFound;
