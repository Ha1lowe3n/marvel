import React, { useCallback, useState } from "react";
import { CharInfo } from "../components/CharInfo";
import { CharList } from "../components/CharList";
import { RandomChar } from "../components/RandomChar";
import decoration from "../resources/img/vision.png";

export const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState<number | null>(null);

    const onCharSelected = useCallback((id: number) => {
        setSelectedChar(id);
    }, []);

    return (
        <>
            <RandomChar />
            <div className="char__content">
                <CharList
                    onCharSelected={onCharSelected}
                    charId={selectedChar}
                />
                <CharInfo charId={selectedChar} />
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};
