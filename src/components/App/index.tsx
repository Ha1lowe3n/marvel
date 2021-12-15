import { useCallback, useState } from "react";
import decoration from "../../resources/img/vision.png";
import { AppHeader } from "../AppHeader";
import { CharInfo } from "../CharInfo";
import { CharList } from "../CharList";
import { RandomChar } from "../RandomChar";

export const App: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState<number | null>(null);

    const onCharSelected = useCallback((id: number) => {
        setSelectedChar(id);
    }, []);

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList
                        onCharSelected={onCharSelected}
                        charId={selectedChar}
                    />
                    <CharInfo charId={selectedChar} />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    );
};
