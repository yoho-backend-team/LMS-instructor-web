// useLoader.ts
import { useContext } from 'react';
import { LoadingContext } from './LodingCon';

export const useLoader = () => {
    return useContext(LoadingContext);
};
