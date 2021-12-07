import "./charList.scss";
import { Component } from "react";
import { MarvelService } from "../../services/MarvelService";

interface StateType {
    characters: {
        id: number;
        name: string;
        description: string | null;
        thumbnail: string | null;
        homepage: string;
        wiki: string;
    }[];
}

export class CharList extends Component {
    state: StateType = {
        characters: [],
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadingCharacters();
    }

    loadingCharacters = async () => {
        const characters = await this.marvelService.getQuantityCharacters(9);
        this.setState({ characters });
    };

    render() {
        console.log(this.state);

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.characters.map((char, i) => (
                        <li key={char.id} className="char__item">
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
