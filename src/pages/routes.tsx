import DailyNews from "./DailyNews/DailyNews";
import Posts from "./posts/Posts";

export default [

    {
        path: "/",
        exact: true,
        public: true,
        component: DailyNews
    },
    {
        path: "/post",
        exact: true,
        public: true,
        component: Posts
    }
]