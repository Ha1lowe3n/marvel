import { Link } from "react-router-dom";
import { ErrorGif } from "../components/ErrorGif";

export const Page404 = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ErrorGif />
            <span
                style={{
                    display: "block",
                    marginTop: "10px",
                    fontSize: "22px",
                    fontWeight: "bold",
                }}
            >
                Page not found
            </span>
            <Link to="/">
                <span
                    style={{
                        display: "block",
                        marginTop: "15px",
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}
                >{`<- go to home page`}</span>
            </Link>
        </div>
    );
};
