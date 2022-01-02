import "./singleComic.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMarvelService } from "../../services/MarvelService";
import { Spinner } from "../../components/Spinner";
import { ErrorGif } from "../../components/ErrorGif";

type ComicType = {
    id: number;
    title: string;
    description: string;
    pageCount: number;
    price: number;
    thumbnail: string;
    languages: string;
};

export const SingleComicPage: React.FC = () => {
    const { id } = useParams();
    const [comic, setComic] = useState<ComicType>({} as ComicType);

    const { loading, error, getComicById, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const updateComic = async () => {
        if (error) clearError();
        if (!id) return;

        const comic = await getComicById(+id);
        setComic(comic);
    };

    const errorOrLoad = loading ? <Spinner /> : error ? <ErrorGif /> : null;

    return (
        errorOrLoad ?? (
            <div className="single-comic">
                <img
                    src={comic.thumbnail}
                    alt="comic thumbnail"
                    className="single-comic__img"
                />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic.title}</h2>
                    <p className="single-comic__descr">{comic.description}</p>
                    <p className="single-comic__descr">
                        {comic.pageCount} pages
                    </p>
                    <p className="single-comic__descr">
                        Language: {comic.languages}
                    </p>
                    <div className="single-comic__price">{comic.price}$</div>
                </div>
                <Link to={"/comics"} className="single-comic__back">
                    Back to all
                </Link>
            </div>
        )
    );
};
