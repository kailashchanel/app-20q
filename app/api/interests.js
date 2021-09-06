import client from "./client";

const endpoint = "/interests";

const getUsersInterests = () => client.get(endpoint);

const postUserInterests = (ans, onUploadProgress) => client.post(endpoint, ans, {
    onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total),
});

export default {
    getUsersInterests,
    postUserInterests,
}