import DailyNews from "./DailyNews/DailyNews";
import Login from "./Login/Login";

export default [

    {
        path: "/",
        exact: true,
        public: true,
        component: DailyNews
    },
]