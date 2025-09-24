/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ClearLocalStorage,
	GetLocalStorage,
	StoreLocalStorage,
} from '@/utils/helper';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
	isAuthenticated: boolean;
	login: (data: string) => void;
	logout: () => void;
	isLoading: boolean;
	user: UserType | null;
};

type UserType = {
	id: string;
	name: string;
	email: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<UserType | null>(null);

	useEffect(() => {
		const token = GetLocalStorage('instructorToken');
		setIsAuthenticated(!!token);
		setIsLoading(false);
	}, []);

	const login = (data: any) => {
		try {
			StoreLocalStorage('instructorToken', data?.token);
			StoreLocalStorage('instructorDetails', data?.user);
			setIsAuthenticated(true);
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	const logout = () => {
		setUser(null);
		ClearLocalStorage();
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, logout, isLoading, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
