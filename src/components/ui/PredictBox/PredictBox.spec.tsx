import * as React from "react";
import { render } from "enzyme";

import PredictBox from "./PredictBox";
import TestProvider from "../../modules/client/TestProvider";

describe("PredictBox", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PredictBox />
      </TestProvider>
    );
  });

  it("", () => {});
});
