import React, { useEffect, useState } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useMarvelService } from "../../services/MarvelService";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";

export type CharType = {
    id: number;
    name: string;
    description: string | null;
    thumbnail: string;
    homepage: string;
    wiki: string;
    comics: {
        resourceURI: string;
        name: string;
    }[];
};

export const RandomChar: React.FC = React.memo(function RandomChar() {
    const [char, setChar] = useState<CharType>({} as CharType);

    const { loading, error, getRandomCharacterId, clearError } =
        useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateChar = async () => {
        if (error) clearError();

        const res = await getRandomCharacterId();

        setChar({
            ...res,
            description: correctDescription(res.description),
        });
    };

    const correctDescription = (description: string | null) => {
        if (!description || description.trim().length === 0) {
            return "there is no description :(";
        }
        if (description && description.trim().length >= 212) {
            return description?.substring(0, 212) + "...";
        }
        return description;
    };

    const { name, description, thumbnail, homepage, wiki } = char;
    const errorOrLoad = loading ? <Spinner /> : error ? <ErrorGif /> : null;

    return (
        <div className="randomchar">
            {errorOrLoad ?? (
                <div className="randomchar__block">
                    <img
                        src={thumbnail!}
                        alt="Random character"
                        className="randomchar__img"
                        style={
                            thumbnail?.includes("image_not_available")
                                ? { objectFit: "contain" }
                                : undefined
                        }
                    />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a
                                href={homepage}
                                className="button button__main"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="inner">homepage</div>
                            </a>
                            <a
                                href={wiki}
                                className="button button__secondary"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    className="button button__main"
                    onClick={() => updateChar()}
                >
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
});
