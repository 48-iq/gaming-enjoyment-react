import axios from "axios";

export default class GameService {

    static async getGames({page, size}) {
        const response = await axios.get("http://localhost:8080/games/all", {
            params: {
                page: page,
                size: size
            }
        });
        return response;
    }

    static async getGame(id) {
        const response = await axios.get("http://localhost:8080/games/" + id);
        console.log(response);
        return response;
    }

    static async getUserPlayedGames({userId, page, size}) {
        const response = await axios.get("http://localhost:8080/games/user/played", {
            params: {
                userId: userId,
                page: page,
                size: size
            }
        });
        return response;
    }

    static async getUserPlayingGames({userId, page, size}) {
        const response = await axios.get("http://localhost:8080/games/user/played", {},
            {}
        )
        return response;
    }

    static async getGamesByTitle({title, page, size}) {
        const response = await axios.get("http://localhost:8080/games/title", {
                params: {
                    title: title,
                    page: page,
                    size: size
                }
            }
        );
        return response;
    }

    static async getGamesByGenre({genres, page, size}) {
        const response = await axios.get("http://localhost:8080/games/genre", {
            params: {
                genres: genres,
                page: page,
                size: size
            }
        })
    }

    static async getGamesByPlatform({platforms, page, size}) {
        const response = await axios.get("http://localhost:8080/games/platform", {
            params: {
                platforms: platforms,
                page: page,
                size: size
            }
        })
    }

    static async createGame(game) {
        console.log(game);
        const response = await axios.post("http://localhost:8080/games/create",
            game
        );
        return response;
    }

    static async updateGame(game) {
        console.log(game);
        const response = await axios.put("http://localhost:8080/games/update",
            game
        );
        return response;
    }

    static async deleteGame(id) {
        const response = await axios.delete("http://localhost:8080/games/delete/" + id);
        return response;
    }
}