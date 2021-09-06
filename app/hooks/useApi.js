import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [preConditionFailed, setPreConditionFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (response.status === 204) {
      setPreConditionFailed(true);
    } else {
      setPreConditionFailed(false);
    }
    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return { request, data, error, loading, preConditionFailed };
};
