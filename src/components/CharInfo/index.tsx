import "./charInfo.scss";
import { Component } from "react";
import { MarvelService } from "../../services/MarvelService";
import { CharType } from "../RandomChar";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";
import { Skeleton } from "../Skeleton";

interface CharInfoProps {
    charId: number | null;
}

interface StateType {
    char: CharType;
    loading: boolean;
    error: boolean;
}

export class CharInfo extends Component<CharInfoProps> {
    state: StateType = {
        char: {} as CharType,
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps: CharInfoProps, prevState: StateType) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = async () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        try {
            const char = await this.marvelService.getCharacterById(charId);
            this.setState({ char: char, loading: false });
        } catch (err) {
            this.setState({ loading: false, error: true });
        }
    };

    mapCharComics = (comics: CharType["comics"]) => {
        if (comics.length > 0) {
            const newArr = [];
            for (let i = 0; i > 9; i++) {
                if (!comics[i]) break;
                newArr.push(comics[i]);
            }
            return newArr;
        } else {
            return "There is no comics with this character";
        }
    };

    render() {
        const { char, loading, error } = this.state;

        console.log(char, loading, error);

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
                                    char.thumbnail?.includes(
                                        "image_not_available"
                                    )
                                        ? { objectFit: "contain" }
                                        : undefined
                                }
                            />
                            <div>
                                <div className="char__info-name">
                                    {char.name}
                                </div>
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
                            {this.mapCharComics(char.comics)}
                        </ul>
                    </>
                )}
            </div>
        );
    }
}
