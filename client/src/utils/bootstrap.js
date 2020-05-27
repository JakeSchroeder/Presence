import { queryCache } from "react-query";
import * as auth from "./auth-client";
// import * as listItemsClient from "./list-items-client";

async function bootstrapAppData() {
  let appData = { user: null };

  if (auth.isLoggedIn()) {
    const [user] = await Promise.all([
      auth.getUser(),
      // listItemsClient.read().then((d) => d.listItems),
    ]);
    appData = { user };
  }
  // queryCache.setQueryData("list-items", appData.listItems);
  return appData;
}

export { bootstrapAppData };
