import "./charList.scss";
import { Component } from "react";
import { MarvelService } from "../../services/MarvelService";
import { Spinner } from "../../Spinner";
import { ErrorGif } from "../ErrorGif";
import { CharType } from "../RandomChar";

interface CharListProps {
    onCharSelected: (id: number) => void;
    charId: number | null;
}
interface StateType {
    characters: CharType[];
    loading: boolean;
    error: boolean;
    newItemsLoading: boolean;
    offsetCharacters: number;
    limitOffsetCharacters: number;
}

export class CharList extends Component<CharListProps> {
    state: StateType = {
        characters: [],
        loading: false,
        error: false,
        newItemsLoading: false,
        offsetCharacters: 0,
        limitOffsetCharacters: 1559,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadingCharacters();
    }

    loadingCharacters = async () => {
        try {
            this.setState({ loading: true, newItemsLoading: true });

            const characters = await this.marvelService.getCharacters(
                this.state.offsetCharacters
            );

            this.setState({
                characters: characters,
                loading: false,
                newItemsLoading: false,
            });
        } catch (err) {
            this.setState({
                loading: false,
                error: true,
                newItemsLoading: false,
            });
        }
    };

    onRequestNewCharacters = async () => {
        try {
            this.setState({ newItemsLoading: true, error: false });

            const changeOffset =
                this.state.offsetCharacters <= 1550
                    ? 9
                    : this.state.limitOffsetCharacters -
                      this.state.offsetCharacters;

            const newCharacters = await this.marvelService.getCharacters(
                this.state.offsetCharacters + changeOffset
            );

            this.setState(({ characters, offsetCharacters }: StateType) => ({
                characters: [...characters, ...newCharacters],
                loading: false,
                offsetCharacters: offsetCharacters + changeOffset,
                newItemsLoading: false,
            }));
        } catch (err) {
            this.setState({
                loading: false,
                error: true,
                newItemsLoading: false,
            });
        }
    };

    render() {
        const { onCharSelected, charId } = this.props;
        const {
            loading,
            error,
            newItemsLoading,
            limitOffsetCharacters,
            offsetCharacters,
        } = this.state;

        console.log(limitOffsetCharacters);
        console.log(offsetCharacters);

        const errorOrLoad = loading ? <Spinner /> : error ? <ErrorGif /> : null;

        return (
            <div className="char__list">
                {errorOrLoad ?? (
                    <ul className="char__grid">
                        {this.state.characters.map((char, i) => (
                            <li
                                key={char.id}
                                className={
                                    "char__item" +
                                    " " +
                                    (char.id === charId &&
                                        "char__item_selected")
                                }
                                onClick={() => onCharSelected(char.id)}
                                tabIndex={i + 1}
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
                {offsetCharacters !== limitOffsetCharacters && (
                    <button
                        className="button button__main button__long"
                        disabled={newItemsLoading}
                        onClick={() => this.onRequestNewCharacters()}
                    >
                        <div className="inner">
                            {newItemsLoading ? "Waiting..." : "Load more"}
                        </div>
                    </button>
                )}
            </div>
        );
    }
}
