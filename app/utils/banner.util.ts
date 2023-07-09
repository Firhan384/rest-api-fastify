import figlet from "figlet";
import { AppConfig } from "../configs/app.config";

export const printBanner = () => {
  figlet(AppConfig.APP_NAME, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
};
