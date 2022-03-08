import os from "os";
import path from "path";

let userData = "";
const platform = os.platform();
if (platform === "win32") {
  userData = path.join(process.env.APPDATA, "simple-storage");
} else if (platform === "darwin") {
  userData = path.join(
    process.env.HOME,
    "Library",
    "Application Support",
    "simple-storage"
  );
} else {
  userData = path.join("var", "local", "simple-storage");
}

export { userData };
