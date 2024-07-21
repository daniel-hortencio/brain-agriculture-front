import {
  InputGroup,
  InputGroupProps,
} from "@/components/ui/custom/input-group";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

const renderComponent = (props: InputGroupProps) =>
  render(<InputGroup {...props} />);

describe("InputGroup", () => {
  it("renders a label", () => {
    renderComponent({ label: "Label Title" });

    const label = screen.getByText("Label Title");

    expect(label).toBeInTheDocument();
  });

  it("renders a error message", () => {
    renderComponent({ label: "", error: "Invalid Field" });

    const error_message = screen.getByText("Invalid Field");

    expect(error_message).toBeInTheDocument();
  });

  it("call onChange function", () => {
    const handleChange = jest.fn();
    const { debug } = renderComponent({
      label: "",
      ["data-testid"]: "id_field",
      onChange: handleChange,
    });

    const input = screen.getByTestId("id_field");
    fireEvent.change(input, { target: { value: "Text Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toContain("Text Value");
  });
});
