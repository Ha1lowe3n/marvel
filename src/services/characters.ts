import { CharType } from "../components/RandomChar";
import { IParams, UrlType } from "./MarvelService";

export const characters = ({
    getResultsFromRequest,
    _baseUrl,
    _apiKey,
}: IParams) => {
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

    const getCharactersByOffset = async (
        offset: number
    ): Promise<CharType[]> => {
        const results = await getResultsFromRequest(
            `${_baseUrl}/characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return results.map((res: any) => transformCharacter(res));
    };

    const transformCharacter = (char: any): CharType => {
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
        getAllCharacteres,
        getRandomCharacterId,
        getCharactersByOffset,
        getCharacterById,
    };
};
