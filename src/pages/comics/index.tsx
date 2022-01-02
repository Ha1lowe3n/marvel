import React, { useEffect } from "react";
import "./comicsList.scss";
import { Link } from "react-router-dom";
import { AppBanner } from "../../components/AppBanner";
import { ErrorGif } from "../../components/ErrorGif";
import { Spinner } from "../../components/Spinner";
import { useList } from "../../hooks/list.hook";

export type ComicsType = {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
};

export const ComicsPage: React.FC = () => {
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
        <>
            <AppBanner />
            <div className="comics__list">
                {errorOrLoad ?? (
                    <ul className="comics__grid">
                        {(items as ComicsType[]).map((item) => (
                            <li
                                key={item.id + Math.random() * 100}
                                className="comics__item"
                            >
                                <Link to={String(item.id)}>
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
                                </Link>
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
        </>
    );
};
