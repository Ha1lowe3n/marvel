import { ComicsType } from "../components/ComicsList";
import { IParams } from "./MarvelService";

export const comics = ({
    getResultsFromRequest,
    _baseUrl,
    _apiKey,
}: IParams) => {
    // return : thubnail, prices
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

    return {
        getComicsByOffset,
    };
};
