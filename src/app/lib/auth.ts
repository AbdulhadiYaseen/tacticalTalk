"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await fetch('/api/auth/check-auth',{
                    method: 'GET',
                    credentials: 'include',
                });

                if(response.ok){
                    const data = await response.json();
                    setIsAuthenticated(true);
                    setUser(data.user);
                }
                else{
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
            catch(error){
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                setUser(null);
            }
            finally{
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);
    
    const redirectToLogin = () => {
        router.push('/login');
    };
    
    return { isAuthenticated, isLoading, user, redirectToLogin };
}