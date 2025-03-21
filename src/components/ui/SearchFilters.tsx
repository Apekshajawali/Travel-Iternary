
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { filterCategories } from '@/lib/data';

interface SearchFiltersProps {
  onSearchChange: (term: string) => void;
  onFilterChange: (filters: string[]) => void;
}

const SearchFilters = ({ onSearchChange, onFilterChange }: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };
  
  const toggleFilter = (value: string) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter(filter => filter !== value)
      : [...selectedFilters, value];
    
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-travel-blue focus:border-transparent transition-all duration-300"
          />
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Filter by:</h3>
          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-travel-blue flex items-center hover:text-travel-dark-blue transition-colors duration-300"
            >
              Clear all <X size={16} className="ml-1" />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {filterCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-travel-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {activeCategory && (
          <div className="bg-gray-50 p-4 rounded-lg animate-fade-in mb-4">
            <div className="flex flex-wrap gap-2">
              {filterCategories
                .find(category => category.id === activeCategory)
                ?.options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter(option.value)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                      selectedFilters.includes(option.value)
                        ? 'bg-travel-blue text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-travel-blue'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
            </div>
          </div>
        )}
        
        {selectedFilters.length > 0 && (
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Selected filters:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map(filter => {
                const option = filterCategories
                  .flatMap(category => category.options)
                  .find(option => option.value === filter);
                
                return (
                  <span
                    key={filter}
                    className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-travel-blue/10 text-travel-blue"
                  >
                    {option?.label}
                    <button
                      onClick={() => toggleFilter(filter)}
                      className="ml-1.5 hover:text-travel-dark-blue"
                      aria-label={`Remove ${option?.label} filter`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
