import { useState } from "react";
import { CharType } from "../components/RandomChar";
import { useMarvelService } from "../services/MarvelService";

type ComicsType = {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
};

type ListType = "comics" | "characters";

export const useList = (type: ListType) => {
    const [items, setItems] = useState<Array<ComicsType | CharType>>([]);
    const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);

    const {
        loading,
        error,
        getCharactersByOffset,
        clearError,
        getComicsByOffset,
    } = useMarvelService();

    const limitOffset = type === "characters" ? 1559 : 500;

    const chooseMethod = async (newOffset = 0) => {
        if (type === "characters") {
            return await getCharactersByOffset(offset + newOffset);
        } else {
            return await getComicsByOffset(offset + newOffset);
        }
    };

    const changeOffset = () => {
        let newOffset;
        if (type === "characters") {
            newOffset = offset <= 1550 ? 9 : limitOffset - offset;
        } else {
            newOffset = offset <= 492 ? 8 : limitOffset - offset;
        }
        return newOffset;
    };

    const loadingItems = async () => {
        setNewItemsLoading(true);

        const items = await chooseMethod();
        setItems(items);

        setNewItemsLoading(false);
    };

    const onRequestNewItems = async () => {
        if (error) clearError();
        setNewItemsLoading(true);

        const newOffset = changeOffset();

        const newItems = await chooseMethod(newOffset);

        setItems((state) => [...state, ...newItems]);
        setOffset((state) => state + newOffset);
        setNewItemsLoading(false);
    };

    const showSpinner = !items.length && loading ? true : null;
    const showError = error ? true : null;

    return {
        showSpinner,
        showError,
        items,
        newItemsLoading,
        offset,
        limitOffset,
        onRequestNewItems,
        loadingItems,
    };
};
