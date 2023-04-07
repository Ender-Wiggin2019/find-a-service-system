import React from 'react';
import { ServiceProvider } from '~/components/types/user';

type ProviderItemProps = {
  provider: ServiceProvider;
};

const ProviderItem: React.FC<ProviderItemProps> = ({ provider }) => {
  return (
    <div className="divide-y divide-gray-200 mt-4 shadow-xl p-4">
      <div className="flex items-center py-4">
        <div className="w-6">
          <input
            title="select provider"
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
            className="form-checkbox h-5 w-5 text-blue-600 rounded-sm border-gray-300"
          />
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-900">{provider.displayName}</div>
          <div className="text-sm text-gray-500">{provider.email}</div>
          <span className="inline-flex text-sm text-gray-500">{provider.address}</span>
        </div>
        <div className="ml-auto flex-shrink-0">
          {provider.isVerified ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Not Verified
            </span>
          )}
        </div>
      </div>
      <div className="py-4">
        <div className="text-sm text-gray-500">{provider.description}</div>
      </div>
    </div>
  );
};

export default ProviderItem;
