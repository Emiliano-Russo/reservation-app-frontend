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
  const [loading, setLoading] = useState(true);
  const lastKeyRef = useRef<LastKey | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  async function loadMoreData() {
    if (isFetching) return;
    setLoading(true);
    setIsFetching(true);
    try {
      const result = await fetchData(lastKeyRef.current);
      if (result.lastKey) {
        lastKeyRef.current = result.lastKey;
      } else {
        lastKeyRef.current = undefined;
      }
      setData((prev) => [...prev, ...result.items]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMoreData();
  }, []);

  return {
    data,
    loading,
    loadMoreData,
    updateData: (updatedData: T[]) => setData(updatedData),
  };
}
