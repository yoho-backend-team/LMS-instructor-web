// // app/hooks.ts
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '../../../store/store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux'; // Type-only import
// import type { RootState, AppDispatch } from '../../../store/store'; // Type-only import

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// hooks.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store'; // adjust path

export const useAppDispatch = () => useDispatch<AppDispatch>();
