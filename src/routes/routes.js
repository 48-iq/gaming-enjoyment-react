import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import ProfileEditPage from "../pages/ProfileEditPage";
import GamesPlayedList from "../pages/GamesPlayedList";
import GamesPlayingList from "../pages/GamesPlayingList";
import GamesPage from "../pages/GamesPage";
import GameIdPage from "../pages/GameIdPage";

export const routes = [
    {path: '/login', component: LoginPage, exact: true},
    {path: '/register', component: RegisterPage, exact: true}
]

export const userRoutes = [
    {path: '/profile', component: ProfilePage, exact: true},
    {path: '/profile/edit', component: ProfileEditPage, exact: true},
    {path: '/profile/games/played', component: GamesPlayedList, exact: true},
    {path: '/profile/games/playing', component: GamesPlayingList, exact: true},
    {path: '/games/all', component: GamesPage, exact: true},
    {path: '/games/:id', component: GameIdPage, exact: true}
]

export const adminRoutes = [
    {path: '/profile', component: ProfilePage, exact: true},
    {path: '/profile/edit', component: ProfileEditPage, exact: true},
    {path: '/profile/games/played', component: GamesPlayedList, exact: true},
    {path: '/profile/games/playing', component: GamesPlayingList, exact: true},
    {path: '/games/all', component: GamesPage, exact: true},
    {path: '/games/:id', component: GameIdPage, exact: true}
]