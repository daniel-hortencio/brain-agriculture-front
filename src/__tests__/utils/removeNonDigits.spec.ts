import { removeNonDigits } from "@/utils/removeNonDigits";

describe("Remove Non-Digits", () => {
  it("return only digits", () => {
    const value = "R$ 123";

    const masked_value = removeNonDigits(value);

    expect(masked_value).toBe("123");
  });
});
