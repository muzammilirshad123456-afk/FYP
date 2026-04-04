import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dt6gfdtur",
  api_key: "646457913564327",
  api_secret: "qP5rHawH_ZoNnoCfioA_799sj6w",
});

app.listen(5000, () => {
  console.log(`Server listening at port 5000`);
});
