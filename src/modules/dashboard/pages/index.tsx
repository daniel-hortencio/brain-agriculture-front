"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useProducers } from "@/modules/producers/store";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { ibgeDataServices } from "@/services/ibgeDataServices";
import { Chart, ChartLegends } from "@/components/ui/custom/chart";
import { Divider } from "@/components/ui/divider";

export const Dashboard = () => {
  const { producers } = useSelector(useProducers);

  const { data: ufs_data = [], isFetching } = useQuery({
    queryKey: ["ufs"],
    queryFn: async () => {
      const { isOk, data } = await ibgeDataServices.getUFs();

      if (!isOk) {
        throw new Error(data.message);
      }

      return data;
    },
  });

  const total_farms = producers.length;
  const total_farms_area = producers.reduce(
    (acc, p) => (acc += p.total_area),
    0
  );

  const getUFsChartData = () => {
    let ufs_recurrency: { uf: string; recurrency: number }[] = [];
    producers.forEach((producer) => {
      const uf_index = ufs_recurrency.findIndex(
        (r: any) => r.uf === producer.uf
      );

      if (uf_index >= 0) {
        ufs_recurrency[uf_index].recurrency += 1;
      } else {
        ufs_recurrency.push({
          uf: producer.uf,
          recurrency: 1,
        });
      }
    }, [] as { uf: string; recurrency: number }[]);

    return ufs_recurrency?.map((r) => ({
      name: ufs_data?.find((data) => data.sigla === r.uf)?.nome || r.uf,
      value: r.recurrency,
      label: r.uf,
    }));
  };

  const getCropsChartData = () => {
    let crops_recurrency: { name: string; recurrency: number }[] = [];

    producers.forEach((producer) => {
      producer.planting_crops.forEach((crop) => {
        const crop_index = crops_recurrency.findIndex(
          (c: any) => c.name === crop
        );

        if (crop_index >= 0) {
          crops_recurrency[crop_index].recurrency += 1;
        } else {
          crops_recurrency.push({
            name: crop,
            recurrency: 1,
          });
        }
      });
    }, [] as { crop: string; recurrency: number }[]);

    return crops_recurrency?.map((c) => ({
      name: c.name,
      value: c.recurrency,
      label: "",
    }));
  };

  const getGroundUsageChartData = () => {
    const ground_usage = { total: 0, arable_area: 0, vegetation_area: 0 };

    producers.forEach((producer) => {
      ground_usage.total += producer.total_area;
      ground_usage.arable_area += producer.arable_area;
      ground_usage.vegetation_area += producer.vegetation_area;
    });

    return [
      {
        name: "Não utilizado",
        value:
          ground_usage.total -
          ground_usage.arable_area -
          ground_usage.vegetation_area,
        label: "",
      },
      {
        name: "Agricultável",
        value: ground_usage.arable_area,
        label: "",
      },
      {
        name: "Vegetação",
        value: ground_usage.vegetation_area,
        label: "",
      },
    ];
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex">
        <h1 className="text-2xl font-semibold">Produtores</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <Card className="w-full md:max-w-80">
          <CardContent className="space-y-2">
            <CardTitle className="text-lg">Total de fazendas</CardTitle>
            <CardDescription className="text-3xl lg:text-4xl font-semibold text-slate-500">
              {total_farms.toLocaleString("pt-BR")}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="w-full md:max-w-80">
          <CardContent className="space-y-2">
            <CardTitle className="text-lg">
              Total de fazendas em hectares
            </CardTitle>
            <CardDescription className="text-3xl lg:text-4xl font-semibold text-slate-500">
              {total_farms_area.toLocaleString("pt-BR")}
              <span className="font-medium text-xl lg:text-2xl text-slate-400/70">
                ha
              </span>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="grid xl:grid-cols-3 gap-5">
        <Card>
          <CardContent>
            <CardTitle className="text-lg">Estados</CardTitle>
          </CardContent>
          <div className="flex-auto lg:py-10 flex items-center justify-center">
            <Chart data={getUFsChartData} />
          </div>
          <Divider className="mx-5" />
          <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-x-4 gap-y-2">
            <ChartLegends data={getUFsChartData} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle className="text-lg">Culturas</CardTitle>
          </CardContent>

          <div className="flex-auto lg:py-10 flex items-center justify-center">
            <Chart data={getCropsChartData} />
          </div>
          <Divider className="mx-5" />
          <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-x-4 gap-y-2">
            <ChartLegends data={getCropsChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle className="text-lg">Uso do solo</CardTitle>
          </CardContent>
          <div className="flex-auto flex-col lg:py-10 flex items-center justify-center">
            <Chart data={getGroundUsageChartData} />
          </div>
          <Divider className="mx-5" />
          <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-x-4 gap-y-2">
            <ChartLegends data={getGroundUsageChartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
