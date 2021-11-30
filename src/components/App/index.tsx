import decoration from "../../resources/img/vision.png";
import { AppHeader } from "../AppHeader";
import { CharInfo } from "../CharInfo";
import { CharList } from "../CharList";
import { RandomChar } from "../RandomChar";

export const App: React.FC = () => {
    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList />
                    <CharInfo />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    );
};
