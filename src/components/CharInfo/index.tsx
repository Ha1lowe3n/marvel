import "./charInfo.scss";
import { useEffect, useState } from "react";
import { useMarvelService } from "../../services/MarvelService";
import { CharType } from "../RandomChar";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";
import { Skeleton } from "../Skeleton";

interface CharInfoProps {
    charId: number | null;
}

export const CharInfo: React.FC<CharInfoProps> = ({ charId }) => {
    const [char, setChar] = useState<CharType>({} as CharType);

    const { loading, error, getCharacterById, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charId]);

    const updateChar = async () => {
        if (error) clearError();
        if (!charId) return;

        const char = await getCharacterById(charId);
        setChar(char);
    };

    const mapCharComics = (comics: CharType["comics"]) => {
        if (comics.length > 0) {
            const newArr = [];
            for (let i = 0; i < 9; i++) {
                if (!comics[i]) break;
                newArr.push(comics[i]);
            }

            return newArr.map((item, i) => {
                return (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                );
            });
        } else {
            return "There is no comics with this character";
        }
    };

    const skeleton =
        Object.keys(char).length !== 0 || loading || error ? null : (
            <Skeleton />
        );

    const errorOrLoad = loading ? <Spinner /> : error ? <ErrorGif /> : null;

    return (
        <div className="char__info">
            {skeleton ?? errorOrLoad ?? (
                <>
                    <div className="char__basics">
                        <img
                            src={char.thumbnail}
                            alt={char.name}
                            style={
                                char.thumbnail?.includes("image_not_available")
                                    ? { objectFit: "contain" }
                                    : undefined
                            }
                        />
                        <div>
                            <div className="char__info-name">{char.name}</div>
                            <div className="char__btns">
                                <a
                                    href={char.homepage}
                                    className="button button__main"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div className="inner">homepage</div>
                                </a>
                                <a
                                    href={char.wiki}
                                    className="button button__secondary"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">{char.description}</div>

                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {mapCharComics(char.comics)}
                    </ul>
                </>
            )}
        </div>
    );
};
