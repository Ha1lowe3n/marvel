import "./comicsList.scss";
import { useEffect } from "react";
import { useList } from "../../hooks/list.hook";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";

export type ComicsType = {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
};

export const ComicsList: React.FC = () => {
    const {
        items,
        loadingItems,
        onRequestNewItems,
        showSpinner,
        showError,
        offset,
        newItemsLoading,
        limitOffset,
    } = useList("comics");

    useEffect(() => {
        loadingItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const errorOrLoad = showSpinner ? (
        <Spinner />
    ) : showError ? (
        <ErrorGif />
    ) : null;

    return (
        <div className="comics__list">
            {errorOrLoad ?? (
                <ul className="comics__grid">
                    {(items as ComicsType[]).map((item) => (
                        <li
                            key={item.id + Math.random() * 100}
                            className="comics__item"
                        >
                            <a href="#">
                                <img
                                    src={item.thumbnail}
                                    alt="comics thumbnail"
                                    className="comics__item-img"
                                />
                                <div className="comics__item-name">
                                    {item.title}
                                </div>
                                <div className="comics__item-price">
                                    {item.price ? `${item.price}$` : null}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            {offset !== limitOffset && (
                <button
                    onClick={() => onRequestNewItems()}
                    disabled={newItemsLoading}
                    className="button button__main button__long"
                >
                    <div className="inner">
                        {newItemsLoading ? "Waiting..." : "Load more"}
                    </div>
                </button>
            )}
        </div>
    );
};
