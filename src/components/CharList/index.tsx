import "./charList.scss";
import { useEffect, memo } from "react";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";
import { useList } from "../../hooks/list.hook";
import { CharType } from "../RandomChar";

interface CharListProps {
    onCharSelected: (id: number) => void;
    charId: number | null;
}

export const CharList: React.FC<CharListProps> = memo(function CharList({
    onCharSelected,
    charId,
}) {
    const {
        items,
        loadingItems,
        onRequestNewItems,
        showSpinner,
        showError,
        offset,
        newItemsLoading,
        limitOffset,
    } = useList("characters");

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
        <div className="char__list">
            {errorOrLoad ?? (
                <ul className="char__grid">
                    {(items as CharType[]).map((char, i) => (
                        <li
                            key={char.id}
                            className={
                                "char__item" +
                                " " +
                                (char.id === charId && "char__item_selected")
                            }
                            onClick={() => onCharSelected(char.id)}
                            tabIndex={i + 1}
                        >
                            <img
                                src={
                                    char.thumbnail ? char.thumbnail : undefined
                                }
                                style={
                                    char.thumbnail?.includes(
                                        "image_not_available"
                                    )
                                        ? { objectFit: "contain" }
                                        : undefined
                                }
                                alt={char.name}
                            />
                            <div className="char__name">{char.name}</div>
                        </li>
                    ))}
                </ul>
            )}
            {offset !== limitOffset && (
                <button
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    onClick={() => onRequestNewItems()}
                >
                    <div className="inner">
                        {newItemsLoading ? "Waiting..." : "Load more"}
                    </div>
                </button>
            )}
        </div>
    );
});
