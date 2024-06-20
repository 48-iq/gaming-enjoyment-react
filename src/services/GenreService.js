import axios from "axios";

export default class GenreService {
    static async getGenres() {
        const response = await axios.get("http://localhost:8080/genres/all");
        return response;
    }

    static async createGenre({genre}) {
        const response = await axios.post("http://localhost:8080/genres/create", genre);
        return response;
    }

    static async updateGenre({genre}) {
        const response = await axios.put("http://localhost:8080/genres/update", genre);
        return response;
    }

    static async deleteGenre({id}) {
        const response = await axios.delete("http://localhost:8080/genres/delete" + id);
        return response;
    }

    static async getGenre({id}) {
        const response = await axios.get("http://localhost:8080/genres/" + id);
        return response;
    }

    static async getGenresByIds({ids}) {
        const response = await axios.get("http://localhost:8080/genres/ids", {
            params: {
                ids: ids
            }
        });
        return response;
    }
}