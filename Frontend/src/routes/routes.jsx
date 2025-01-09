import Detail from "../pages/Detail/Detail";
import Home from "../pages/Home/Home";


const ROUTES = [
    {
        path: "/cars",
        element: <Home />
    },
    {
        path: "/cars/:id",
        element: <Detail />
    }
]

export default ROUTES