import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";

export const AppHeader: React.FC = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            color: isActive ? "#9f0013" : "inherit",
                        })}
                    >
                        Characters
                    </NavLink>
                    /
                    <NavLink
                        to="/comics"
                        style={({ isActive }) => ({
                            color: isActive ? "#9f0013" : "inherit",
                        })}
                    >
                        Comics
                    </NavLink>
                </ul>
            </nav>
        </header>
    );
};
