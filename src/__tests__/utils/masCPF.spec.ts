import { maskCPF } from "@/utils/maskCPF";

describe("Mask CPF", () => {
  it("return mask", () => {
    const cpf = "11122233344";

    const masked_cpf = maskCPF(cpf);

    expect(masked_cpf).toBe("111.222.333-44");
  });
});
