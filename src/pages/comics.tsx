import React from "react";
import { AppBanner } from "../components/AppBanner";
import { ComicsList } from "../components/ComicsList";

export const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ComicsList />
        </>
    );
};
