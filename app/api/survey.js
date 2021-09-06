import client from "./client";

const endpoint = "/survey";

const getSurvey = () => client.get(endpoint);

export default {
    getSurvey,
}