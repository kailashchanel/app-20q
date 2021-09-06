import client from "./client";

const endpoint = "/compare";

const getAllComparisons = () => client.get(endpoint);

export default {
    getAllComparisons,
};