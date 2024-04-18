import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "prod"
      ? "https://adopet.api.sapituca.site"
      : "http://localhost:9000",
});
