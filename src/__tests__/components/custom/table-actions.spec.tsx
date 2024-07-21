import {
  TableActions,
  TableActionsProps,
} from "@/components/ui/custom/table-actions";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const renderComponent = (props: TableActionsProps) =>
  render(<TableActions {...props} />);

const handleDelete = jest.fn();
const handleEdit = jest.fn();

describe("InputGroup", () => {
  it("call onDelete function", () => {
    renderComponent({
      onDelete: handleDelete,
      onEdit: handleEdit,
    });
    const trigger = screen.getByTestId("table-actions-trigger");
    fireEvent.pointerDown(trigger);

    const delete_button = screen.getByText("Deletar");
    fireEvent.click(delete_button);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("call onEdit function", () => {
    renderComponent({
      onDelete: handleDelete,
      onEdit: handleEdit,
    });
    const trigger = screen.getByTestId("table-actions-trigger");
    fireEvent.pointerDown(trigger);

    const edit_button = screen.getByText("Editar");
    fireEvent.click(edit_button);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
