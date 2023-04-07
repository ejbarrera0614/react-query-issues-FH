import axios from "axios";
const token =
  "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";
export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
