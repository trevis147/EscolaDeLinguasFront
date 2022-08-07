import { Route, Routes } from "react-router-dom";
import { Home } from "../page/home";
import { ViewGrades } from "../page/viewGrades";

const RoutesPage = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ViewGrades" element={<ViewGrades />} />
            </Routes>
        </>
    )
}
export default RoutesPage