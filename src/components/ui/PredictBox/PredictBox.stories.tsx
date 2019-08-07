import * as React from "react";
import { storiesOf } from "@storybook/react";
import PredictBox from "./PredictBox";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("PredictBox", () => (
  <TestProvider>
    <PredictBox />
  </TestProvider>
));
