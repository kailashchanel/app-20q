import client from "./client";

const endpoint = "/user";

const getMyInfo = () => client.get(endpoint);

export default {
    getMyInfo,
};