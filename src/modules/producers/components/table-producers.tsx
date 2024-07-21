import { Card, CardContent } from "@/components/ui/card";
import { TableActions } from "@/components/ui/custom/table-actions";
import { Divider } from "@/components/ui/divider";
import { ProducerType } from "@/types";

const TABLE_GRID_DEF =
  "grid grid-cols-[1fr_1fr_8rem_9rem_8rem_9rem_1fr_4rem_2rem]";

const TableHeader = () => (
  <div
    className={`w-full pb-3 gap-5 hidden xl:grid ${TABLE_GRID_DEF} text-sm font-medium text-slate-600 tracking-wide uppercase`}
  >
    <div>
      <p>Produtor</p>
    </div>
    <div>Fazenda</div>
    <div>
      Área Total <span className="lowercase text-slate-400">(ha)</span>
    </div>
    <div>
      Agricultável <span className="lowercase text-slate-400">(ha)</span>
    </div>
    <div>
      Vegetação <span className="lowercase text-slate-400">(ha)</span>
    </div>
    <div>Culturas</div>
    <div>Cidade</div>
    <div>Estado</div>
  </div>
);

type TableRowProps<T> = {
  data: T;
  onDelete: (id: string) => void;
  onEdit: (data: T) => void;
};

const RowMobile = ({ data, onDelete, onEdit }: TableRowProps<ProducerType>) => (
  <div className={`flex gap-5 justify-between`}>
    <div className="w-full gap-5 space-y-4">
      <div className="space-y-1">
        <p className="flex gap-2">
          <strong className="font-semibold">Produtor:</strong> {data.name}
        </p>
        <p className="flex gap-2">
          <strong className="font-semibold">{data.doc_type}:</strong> {data.doc}
        </p>
      </div>

      <div className="space-y-1">
        <p className="flex gap-2">
          <strong className="font-semibold">Fazenda:</strong> {data.farm_name}
        </p>
        <p className="flex gap-2">
          <strong className="font-semibold">Cidade:</strong> {data.city} -{" "}
          {data.uf}
        </p>
      </div>

      <div className="space-y-1">
        <p className="flex gap-2">
          <strong className="font-semibold">Área total:</strong>{" "}
          <span>
            {data.total_area}{" "}
            <small className="text-sm font-medium text-slate-500/80">
              (ha)
            </small>
          </span>
        </p>

        <p className="flex gap-2">
          <strong className="font-semibold">Área agricultável:</strong>{" "}
          <span>
            {data.arable_area}{" "}
            <small className="text-sm font-medium text-slate-500/80">
              (ha)
            </small>
          </span>
        </p>
        <p className="flex gap-2">
          <strong className="font-semibold">Vegetação:</strong>{" "}
          <span>
            {data.vegetation_area}{" "}
            <small className="text-sm font-medium text-slate-500/80">
              (ha)
            </small>
          </span>
        </p>
      </div>
      <div className="space-y-1">
        <p className="flex gap-2 font-semibold">Culturas plantadas:</p>
        <div className="flex flex-row gap-2 flex-wrap">
          {data.planting_crops.map((crop) => (
            <span
              key={crop}
              className="bg-slate-600 text-white border text-sm rounded-full block py-0 px-2 w-fit whitespace-nowrap"
            >
              {crop}
            </span>
          ))}
        </div>
      </div>
    </div>

    <TableActions
      onDelete={() => onDelete(data.id)}
      onEdit={() => onEdit(data)}
    />
  </div>
);

const RowDesktop = ({
  data,
  onDelete,
  onEdit,
}: TableRowProps<ProducerType>) => (
  <div className={`w-full gap-5 ${TABLE_GRID_DEF}`}>
    <div>
      <p>{data.name}</p>
      <small className="text-sm font-medium text-slate-500/80">
        {data.doc}
      </small>
    </div>
    <div>{data.farm_name}</div>
    <div>{data.total_area.toLocaleString("pt-BR")}</div>
    <div>{data.arable_area.toLocaleString("pt-BR")} </div>
    <div>{data.vegetation_area.toLocaleString("pt-BR")} </div>
    <div>
      <div className="flex flex-row gap-1 flex-wrap">
        {data.planting_crops.map((crop) => (
          <span
            key={crop}
            className="bg-slate-600 text-white border text-sm rounded-full block py-0 px-2 w-fit whitespace-nowrap"
          >
            {crop}
          </span>
        ))}
      </div>
    </div>
    <div>{data.city}</div>
    <div>{data.uf}</div>
    <TableActions
      onDelete={() => onDelete(data.id)}
      onEdit={() => onEdit(data)}
    />
  </div>
);

type TableContentProps<T> = {
  data: T[];
  onDelete: (id: string) => void;
  onEdit: (data: T) => void;
};

export const TableProducers = ({
  data,
  onDelete,
  onEdit,
}: TableContentProps<ProducerType>) => {
  return (
    <Card>
      <CardContent>
        <TableHeader />
        {data?.map((producer, index) => (
          <div key={producer.id} className="w-full">
            <div className={`xl:hidden w-full pb-5 space-y-4`}>
              {index > 0 && <Divider />}
              <RowMobile data={producer} {...{ onDelete, onEdit }} />
            </div>
            <div className="hidden xl:block w-full py-2 space-y-3">
              <Divider />
              <RowDesktop data={producer} {...{ onDelete, onEdit }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
