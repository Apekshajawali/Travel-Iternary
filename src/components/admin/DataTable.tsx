
import { useState } from 'react';
import { Edit, Trash2, Search, Plus } from 'lucide-react';

interface DataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onAdd?: () => void;
  title: string;
  searchPlaceholder?: string;
}

const DataTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  title,
  searchPlaceholder = 'Search...',
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = data.filter((item) => {
    const searchString = searchTerm.toLowerCase();
    return Object.keys(item).some((key) => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchString);
      }
      return false;
    });
  });
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-travel-blue focus:border-transparent"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {onAdd && (
              <button
                onClick={onAdd}
                className="inline-flex items-center px-4 py-2 bg-travel-blue text-white rounded-lg hover:bg-travel-blue/90 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Add New
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.key}`} className="px-6 py-4 whitespace-nowrap">
                      {column.render
                        ? column.render(item[column.key], item)
                        : typeof item[column.key] === 'boolean'
                        ? item[column.key] ? 'Yes' : 'No'
                        : item[column.key] || '-'}
                    </td>
                  ))}
                  
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="text-travel-blue hover:text-travel-blue/80 transition-colors p-1"
                          >
                            <Edit size={18} />
                          </button>
                        )}
                        
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="text-travel-coral hover:text-travel-coral/80 transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
