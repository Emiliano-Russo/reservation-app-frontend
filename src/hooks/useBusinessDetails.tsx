import { useState, useEffect } from 'react';
import { REACT_APP_BASE_URL } from '../../env';
import { BusinessService } from '../services/business.service';
import { BusinessTypeService } from '../services/businessType.service';

const businessService = new BusinessService(REACT_APP_BASE_URL);
const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

export const useBusinessDetails = (id) => {
  const [business, setBusiness] = useState<any>(null);
  const [businessType, setBusinessType] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga
  const [error, setError] = useState<any>(null); // Estado para manejar errores

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        setLoading(true); // Iniciar la carga
        if (id) {
          const businessData = await businessService.getBusiness(id);
          setBusiness(businessData);
          const typeData = await businessTypeService.getBusinessType(
            businessData.typeId,
          );
          setBusinessType(typeData);
        }
        setLoading(false); // Finalizar la carga
      } catch (error) {
        console.error('Error fetching business data:', error);
        setError(error); // Establecer el error
        setLoading(false); // Finalizar la carga
      }
    }

    fetchBusinessDetails();
  }, [id]);

  return { business, businessType, loading, error };
};
