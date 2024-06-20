import axios from "axios";


export default class PlatformService {

    static async getPlatform({id}) {
        const response = await axios.get("http://localhost:8080/platforms/" + id);
        return response;
    }

    static async getPlatformsByIds({ids}) {
        const response = await axios.get("http://localhost:8080/platforms/ids", {
            params: {
                ids: ids
            }
        });
        return response;
    }

    static async getPlatforms() {
        const response = await axios.get("http://localhost:8080/platforms/all");
        return response;
    }

    static async createPlatform({platform}) {
        const response = await axios.post("http://localhost:8080/platforms/create",
            platform
        );
        return response;
    }

    static async updatePlatform({platform}) {
        const response = await axios.put("http://localhost:8080/platforms/update",
            platform
        );
        return response;
    }

    static async deletePlatform({id}) {
        const response = await axios.delete("http://localhost:8080/platforms/delete" + id);
        return response;
    }
}