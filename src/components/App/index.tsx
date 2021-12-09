import { Component } from "react";
import decoration from "../../resources/img/vision.png";
import { AppHeader } from "../AppHeader";
import { CharInfo } from "../CharInfo";
import { CharList } from "../CharList";
import { RandomChar } from "../RandomChar";

interface AppState {
    selectedChar: number | null;
}

export class App extends Component {
    state: AppState = {
        selectedChar: null,
    };

    onCharSelected = (id: number) => {
        this.setState({ selectedChar: id });
    };

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList
                            onCharSelected={this.onCharSelected}
                            charId={this.state.selectedChar}
                        />
                        <CharInfo charId={this.state.selectedChar} />
                    </div>
                    <img
                        className="bg-decoration"
                        src={decoration}
                        alt="vision"
                    />
                </main>
            </div>
        );
    }
}
