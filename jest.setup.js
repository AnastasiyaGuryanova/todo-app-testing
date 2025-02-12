import "@testing-library/jest-dom";

import { toBeShorterThan } from "./spec/custom-matchers/toBeShorterThan";
import { toHaveDoneItem } from "./spec/custom-matchers/toHaveDoneItem";

expect.extend({
  toBeShorterThan,
  toHaveDoneItem,
});
