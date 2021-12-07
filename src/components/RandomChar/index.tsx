import React from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { MarvelService } from "../../services/MarvelService";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";

type StateType = {
    char: {
        name: string | null;
        description: string | null;
        thumbnail: string | null;
        homepage: string | null;
        wiki: string | null;
    };
    loading: boolean;
    error: boolean;
};

export class RandomChar extends React.Component {
    state: StateType = {
        char: {
            name: null,
            description: null,
            thumbnail: null,
            homepage: null,
            wiki: null,
        },
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = async () => {
        try {
            this.setState({ loading: true, error: false });

            const id = await this.marvelService.getRandomCharacterId();
            const res = await this.marvelService.getCharacterById(id);

            this.setState({
                char: {
                    ...res,
                    description: this.correctDescription(res.description),
                },
                loading: false,
            });
        } catch (err) {
            this.setState({ loading: false, error: true });
        }
    };

    correctDescription = (description: string) => {
        if (description.trim().length === 0) {
            return "there is no description :(";
        }
        if (description.trim().length >= 212) {
            return description.substring(0, 212) + "...";
        }
        return description;
    };

    render() {
        console.log("render");

        const {
            char: { name, description, thumbnail, homepage, wiki },
            loading,
            error,
        } = this.state;

        console.log(thumbnail);

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
                                    href={homepage ? homepage : undefined}
                                    className="button button__main"
                                >
                                    <div className="inner">homepage</div>
                                </a>
                                <a
                                    href={wiki ? wiki : undefined}
                                    className="button button__secondary"
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
                        onClick={() => this.updateChar()}
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
    }
}
