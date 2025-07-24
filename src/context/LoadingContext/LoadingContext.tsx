import React, { useCallback, useState } from "react";
import { LoadingContext } from './LodingCon'


export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    const showLoader = useCallback(() => { setIsLoading(true) }, []);
    const hideLoader = useCallback(() => { setIsLoading(false) }, []);
    return (
        <LoadingContext.Provider value={{ IsLoading, showLoader, hideLoader }}>
            {children}
        </LoadingContext.Provider>
    );
};
