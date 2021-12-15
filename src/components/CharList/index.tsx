import "./charList.scss";
import { useState, useEffect, memo } from "react";
import { useMarvelService } from "../../services/MarvelService";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";
import { CharType } from "../RandomChar";

interface CharListProps {
    onCharSelected: (id: number) => void;
    charId: number | null;
}

const limitOffsetCharacters = 1559;

export const CharList: React.FC<CharListProps> = memo(function CharList({
    onCharSelected,
    charId,
}) {
    const [characters, setCharacters] = useState<CharType[]>([]);
    const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
    const [offsetCharacters, setOffsetCharacters] = useState<number>(0);

    const { loading, error, getCharactersByOffset, clearError } =
        useMarvelService();

    const loadingCharacters = async () => {
        setNewItemsLoading(true);
        const characters = await getCharactersByOffset(offsetCharacters);
        setCharacters(characters);
        setNewItemsLoading(false);
    };

    useEffect(() => {
        loadingCharacters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequestNewCharacters = async () => {
        if (error) clearError();
        setNewItemsLoading(true);
        const changeOffset =
            offsetCharacters <= 1550
                ? 9
                : limitOffsetCharacters - offsetCharacters;

        const newCharacters = await getCharactersByOffset(
            offsetCharacters + changeOffset
        );
        setCharacters((state) => [...state, ...newCharacters]);
        setOffsetCharacters((state) => state + changeOffset);
        setNewItemsLoading(false);
    };

    const errorOrLoad =
        !characters.length && loading ? (
            <Spinner />
        ) : error ? (
            <ErrorGif />
        ) : null;

    return (
        <div className="char__list">
            {errorOrLoad ?? (
                <ul className="char__grid">
                    {characters.map((char, i) => (
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
            {offsetCharacters !== limitOffsetCharacters && (
                <button
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    onClick={() => onRequestNewCharacters()}
                >
                    <div className="inner">
                        {newItemsLoading ? "Waiting..." : "Load more"}
                    </div>
                </button>
            )}
        </div>
    );
});
