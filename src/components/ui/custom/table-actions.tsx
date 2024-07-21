import { Button } from "../button";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

export type TableActionsProps = {
  onDelete: () => void;
  onEdit: () => void;
};

export const TableActions = ({ onDelete, onEdit }: TableActionsProps) => (
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-testid="table-actions-trigger">
        <Button variant="secondary" size="icon" className="p-0 bg-transparent">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col" side="right">
        <DropdownMenuItem asChild className="w-full">
          <Button
            variant="secondary"
            className="p-0 bg-transparent space-x-2"
            onClick={onEdit}
          >
            <Edit className="size-5" /> <span>Editar</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="w-full">
          <Button
            variant="secondary"
            className="p-0 bg-transparent space-x-2"
            onClick={onDelete}
          >
            <Trash2 className="size-5" /> <span>Deletar</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
