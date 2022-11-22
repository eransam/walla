import "./Routing.css";
import { Route, Routes } from "react-router";
import PageNotFound from "../../LayoutArea/PageNotFound/PageNotFound"; 
import AddUrl from "../../UrlArea/AddUrlArea/AddUrl";

function Routing(): JSX.Element {
    return (
    <Routes>
        <Route path="/" element={<AddUrl />} />
                     {/*כוכבית מתייחסת לכל שאר הכתובות שלא כתובות פה וכך במידה 
                     ומשתמש יקליד כתובת לא קיימת הוא יגיע להודעה שהדף לא קיים */}
        <Route path="*" element={<PageNotFound />} /> 


    </Routes>
    );
}

export default Routing;
