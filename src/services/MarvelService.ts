import { useHttp } from "../hooks/http.hook";

type UrlType = {
    type: string;
    url: string;
};

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

    const getAllCharacteres = async () => {
        const results = await getResultsFromRequest(
            `${_baseUrl}/characters?${_apiKey}`
        );
        return results.map(transformCharacter);
    };

    const getCharacterById = async (characterId: number) => {
        const results = await getResultsFromRequest(
            `${_baseUrl}/characters/${characterId}?${_apiKey}`
        );
        return transformCharacter(results[0]);
    };

    const getRandomCharacterId = async () => {
        const results = await getResultsFromRequest(
            `${_baseUrl}/characters?limit=100&${_apiKey}`
        );
        const randomId = Math.floor(Math.random() * results.length);

        return await getCharacterById(results[randomId].id);
    };

    const getCharactersByOffset = async (offset: number) => {
        const results = await getResultsFromRequest(
            `${_baseUrl}/characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return results.map((res: any) => transformCharacter(res));
    };

    const transformCharacter = (char: any) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls.find((el: UrlType) => el.type === "detail")
                ?.url,
            wiki: char.urls.find((el: UrlType) => el.type === "wiki")?.url,
            comics: char.comics.items,
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacteres,
        getCharacterById,
        getRandomCharacterId,
        getCharactersByOffset,
    };
};
