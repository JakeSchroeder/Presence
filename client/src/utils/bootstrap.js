import { queryCache } from "react-query";
import * as auth from "./auth-client";

async function bootstrapAppData() {
  let appData = { user: null, listItems: [] };

  if (auth.isLoggedIn()) {
    const [user] = await Promise.all([auth.getUser()]);
    appData = { user };
  }

  return appData;
}

export { bootstrapAppData };
