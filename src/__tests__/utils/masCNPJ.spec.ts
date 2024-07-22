import { maskCNPJ } from "@/utils/maskCNPJ";

describe("Mask CNPJ", () => {
  it("return mask", () => {
    const cnpj = "11222333000141";

    const masked_cnpj = maskCNPJ(cnpj);

    expect(masked_cnpj).toBe("11.222.333/0001-41");
  });
});
