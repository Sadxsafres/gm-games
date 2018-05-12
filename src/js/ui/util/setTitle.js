// @flow

import { g } from "../../common";

let currentTitle = "Basketball GM";
const setTitle = (newTitle: string) => {
    if (window.location.pathname.startsWith("/l/")) {
        newTitle += ` - ${g.leagueName}`;
    }
    newTitle = `${newTitle} - Basketball GM`;
    if (newTitle !== currentTitle) {
        currentTitle = newTitle;
        document.title = newTitle;
    }
};

export default setTitle;
