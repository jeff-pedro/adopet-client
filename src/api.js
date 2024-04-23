import axios from "axios";

let env = process.env.NODE_ENV;

if (env === "development") {
  env = "http://localhost:9000";
} else if (env === "staging") {
  env = "https://staging.adopet.api.sapituca.site";
} else {
  env = "https://adopet.api.sapituca.site";
}

export default axios.create({
  baseURL: env,
});
