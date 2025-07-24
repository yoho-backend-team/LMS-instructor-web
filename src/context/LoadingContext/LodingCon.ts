import { createContext } from "react";

interface LoadingContextType {
    IsLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

export const LoadingContext = createContext<LoadingContextType>({
    IsLoading: false,
    showLoader: () => { },
    hideLoader: () => { },
});
