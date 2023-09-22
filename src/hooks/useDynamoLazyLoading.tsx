import { useState, useRef, useEffect } from 'react';

interface LastKey {
  id: string;
  [key: string]: string | number;
}

interface DynamoLazyLoadingOptions<T> {
  initialData: T[];
  fetchData: (lastKey?: LastKey) => Promise<{ items: T[]; lastKey?: LastKey }>;
}

export function useDynamoLazyLoading<T>(options: DynamoLazyLoadingOptions<T>) {
  const { initialData, fetchData } = options;

  const [data, setData] = useState<T[]>(initialData);
  const dataRef = useRef<T[]>(initialData); // Referencia para data
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const lastKeyRef = useRef<LastKey | undefined>(undefined);

  const loadMoreData = async () => {
    if (
      isFetching ||
      (lastKeyRef.current === undefined && dataRef.current.length > 0)
    ) {
      return;
    }

    setLoading(true);
    setIsFetching(true);
    try {
      const result = await fetchData(lastKeyRef.current);
      if (result.lastKey) {
        if (lastKeyRef.current && lastKeyRef.current.id === result.lastKey.id) {
          // Si el lastKey no ha cambiado, no combinamos los datos
          setIsFetching(false);
          setLoading(false);
          return;
        }
        lastKeyRef.current = result.lastKey;
      } else {
        lastKeyRef.current = undefined;
      }
      setData((currentData) => {
        const newData = [...currentData, ...result.items];
        dataRef.current = newData; // Actualizamos dataRef
        return newData;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return {
    data,
    loading,
    loadMoreData,
    updateData: (updatedData: React.SetStateAction<T[]>) => {
      if (typeof updatedData === 'function') {
        setData((prev) => updatedData(prev as T[]));
      } else {
        setData(updatedData);
      }
    },
  };
}
