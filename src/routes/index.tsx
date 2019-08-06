import { lazy, mount, route } from "navi";
import * as React from "react";

import AppNav from "../components/layout/AppNav/AppNav";
import Strings from "../services/Strings";
import PhotoDemo from "../components/pages/PhotoDemo/PhotoDemo";

const strings = new Strings();
const changeCase = require("change-case");

const routes = mount({
  "/": route(req => {
    return {
      title: "Clarifai | Home",
      head: (
        <>
          <link rel="canonical" href="https://localhost" />
        </>
      ),
      view: (
        <AppNav>
          <PhotoDemo />
        </AppNav>
      ),
    };
  }),
});

export default routes;

// TODO: additional configuration
// let route = {
//   url: {
//     pathname: '/navi/core-concepts/',
//     // ...
//   }
//   segments: [/* ... */],
//   title: "Core Concepts",
//   heads: [
//     <meta name="description" content="amazeballs" />, // https://frontarm.com/navi/en/guides/setting-head-meta-title/
//   ],
//   views: [
//     <NaviLayout />,
//     <NaviMDXLayout MDXComponent={/* ... */} />,
//   ],
//   data: {
//     language: 'en',
//   },
// }

// Read more: https://frontarm.com/navi/en/guides/requests-routes-matchers/
// https://frontarm.com/navi/en/guides/nested-views/
// Upload: https://frontarm.com/navi/en/guides/authenticated-routes/
