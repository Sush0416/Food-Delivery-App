import { useState, useEffect } from 'react';
import { Restaurant } from '../types';
import { MOCK_SERVICES } from '../data/mockData';

export const useTiffinServices = () => {
  const [services, setServices] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setServices(MOCK_SERVICES);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load services');
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const getServiceById = (id: string) => {
    return services.find(service => service._id === id);
  };

  return { services, loading, error, getServiceById };
};