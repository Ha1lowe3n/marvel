import { ComicsType } from "../pages/comics/";
import { IParams } from "./MarvelService";

export const comics = ({
    getResultsFromRequest,
    _baseUrl,
    _apiKey,
}: IParams) => {
    const getComicsByOffset = async (offset: number): Promise<ComicsType[]> => {
        const results = await getResultsFromRequest(
            `${_baseUrl}/comics?limit=8&offset=${offset}&${_apiKey}`
        );

        return results.map((res: any) => ({
            id: res.id,
            title: res.title,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            price: res.prices[0].price,
        }));
    };

    const getComicById = async (comicId: number) => {
        const results = await getResultsFromRequest(
            `${_baseUrl}/comics/${comicId}?${_apiKey}`
        );

        const { id, title, description, pageCount, thumbnail, prices } =
            results[0];

        return {
            id,
            title,
            description:
                description.length > 0
                    ? description
                    : "there is no description",
            pageCount,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            price: prices[0].price,
            languages: "en-us",
        };
    };

    return {
        getComicsByOffset,
        getComicById,
    };
};
