import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Page404 } from "../../pages/404";
import { ComicsPage } from "../../pages/comics";
import { MainPage } from "../../pages/main";

import { AppHeader } from "../AppHeader";

export const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};
