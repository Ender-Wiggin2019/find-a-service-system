import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/lib/firebase';
import { SERVICE_PROVIDER_FIRESTORE_PATH } from '~/lib/constants';
import { ServiceProvider } from '../types/user';
import ProviderItem from '../providers/Provider';

const VerifyPage: React.FC = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);

  // read data from firebase to `providers`
  useEffect(() => {
    const fetchServices = async () => {
      const serviceCollection = collection(db, SERVICE_PROVIDER_FIRESTORE_PATH);
      const serviceSnapshot = await getDocs(serviceCollection);
      const providersData: ServiceProvider[] = [];

      await Promise.all(
        serviceSnapshot.docs.map(async (singleDoc) => {
          const data = singleDoc.data();

          providersData.push(
            new ServiceProvider(
              singleDoc.id,
              data.displayName,
              data.email,
              data.address,
              data.description,
              data.isVerified
            )
          );
        })
      );

      setProviders(providersData);
    };

    fetchServices();
  }, []);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-100 w-full items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-900">Need to Verify</h2>
          <div className="text-gray-500 text-sm">
            <span className="font-medium">{providers.length}</span> items
          </div>
        </div>
        {providers.map((provider, index) => {
          if (!provider.isVerified) {
            return <ProviderItem key={index} provider={provider} />;
          }
        })}
      </div>
    </div>
  );
};

export default VerifyPage;
