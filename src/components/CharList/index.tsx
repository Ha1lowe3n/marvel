import "./charList.scss";
import { Component } from "react";
import { MarvelService } from "../../services/MarvelService";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";
import { CharType } from "../RandomChar";

interface CharListProps {
    onCharSelected: (id: number) => void;
}
interface StateType {
    characters: CharType[];
    loading: boolean;
    error: boolean;
}

export class CharList extends Component<CharListProps> {
    state: StateType = {
        characters: [],
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadingCharacters();
    }

    loadingCharacters = async () => {
        try {
            this.setState({ loading: true });

            const characters = await this.marvelService.getQuantityCharacters(
                9
            );
            console.log(characters);

            this.setState({ characters, loading: false });
        } catch (err) {
            this.setState({ loading: false, error: true });
        }
    };

    render() {
        const { onCharSelected } = this.props;
        const { loading, error } = this.state;

        const errorOrLoad = loading ? <Spinner /> : error ? <ErrorGif /> : null;

        return (
            <div className="char__list">
                {errorOrLoad ?? (
                    <ul className="char__grid">
                        {this.state.characters.map((char) => (
                            <li
                                key={char.id}
                                className="char__item"
                                onClick={() => onCharSelected(char.id)}
                            >
                                <img
                                    src={
                                        char.thumbnail
                                            ? char.thumbnail
                                            : undefined
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
