import obj from "./__fixtures__/nested-object";
import flatten from "./flatten";

describe("flatten tests", () => {
  it("should flatten an object with nested objects", () => {
    const value = flatten(obj);
    expect(value).toMatchSnapshot();
  });
});
