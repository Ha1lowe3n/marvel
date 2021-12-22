import { useCallback, useState } from "react";
import decoration from "../../resources/img/vision.png";
import { AppBanner } from "../AppBanner";
import { AppHeader } from "../AppHeader";
import { CharInfo } from "../CharInfo";
import { CharList } from "../CharList";
import { ComicsList } from "../ComicsList";
import { RandomChar } from "../RandomChar";
import { SingleComic } from "../SingleComic";

export const App: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState<number | null>(null);

    const onCharSelected = useCallback((id: number) => {
        setSelectedChar(id);
    }, []);

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <RandomChar />
                <div className="char__content">
                    <CharList
                        onCharSelected={onCharSelected}
                        charId={selectedChar}
                    />
                    <CharInfo charId={selectedChar} />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" /> */}

                <AppBanner />
                <ComicsList />

                {/* <SingleComic /> */}
            </main>
        </div>
    );
};
