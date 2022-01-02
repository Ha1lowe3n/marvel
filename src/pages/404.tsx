import { useNavigate } from "react-router-dom";
import { ErrorGif } from "../components/ErrorGif";

export const Page404 = () => {
    const navigate = useNavigate();

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

            <span
                style={{
                    display: "block",
                    marginTop: "15px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={() => navigate(-1)}
            >{`<- go back`}</span>
        </div>
    );
};
