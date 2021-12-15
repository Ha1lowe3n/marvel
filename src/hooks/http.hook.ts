import { useState, useCallback } from "react";
import axios from "axios";

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const makeRequest = useCallback(
        async (url: string, method: MethodType = "GET", body = null) => {
            setLoading(true);

            try {
                const response = await axios({ url, method });
                setLoading(false);
                return response;
            } catch (error: any) {
                setLoading(false);
                setError(error.message);
                throw error;
            }
        },
        []
    );

    const clearError = useCallback(() => setError(null), []);

    return { loading, error, makeRequest, clearError };
};
