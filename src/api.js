import axios from "axios";

let env = process.env.NODE_ENV;

if (env === "development") {
  env = "https://staging.adopet.api.sapituca.site";
} else if (env === "test") {
  env = "http://localhost:9000";
} else {
  env = "https://adopet.api.sapituca.site";
}

export default axios.create({
  baseURL: env,
});
