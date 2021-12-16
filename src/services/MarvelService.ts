import { useHttp } from "../hooks/http.hook";
import { characters } from "./characters";
import { comics } from "./comics";

export type UrlType = {
    type: string;
    url: string;
};

export interface IParams {
    getResultsFromRequest: (url: string) => Promise<any>;
    _baseUrl: string;
    _apiKey: string;
}

export const useMarvelService = () => {
    const _baseUrl = `https://gateway.marvel.com:443/v1/public`;
    const _apiKey = `apikey=69d88190cd71ff804d98f5a285ed6964`;

    const { loading, error, makeRequest, clearError } = useHttp();

    const getResultsFromRequest = async (url: string) => {
        const {
            data: {
                data: { results },
            },
        } = await makeRequest(url);

        return results;
    };

    const params: IParams = { getResultsFromRequest, _baseUrl, _apiKey };

    const {
        getAllCharacteres,
        getRandomCharacterId,
        getCharactersByOffset,
        getCharacterById,
    } = characters(params);

    const { getComicsByOffset } = comics(params);

    return {
        loading,
        error,
        clearError,
        getAllCharacteres,
        getCharacterById,
        getRandomCharacterId,
        getCharactersByOffset,
        getComicsByOffset
    };
};
