import { getData } from "./main";

export async function getTramos(initialDate: string, finalDate: string) {
  return await getData(
    "/tramos",
    JSON.stringify({ fechainicial: initialDate, fechafinal: finalDate })
  );
}

export async function getCliente(initialDate: string, finalDate: string) {
  return await getData(
    "/cliente",
    JSON.stringify({ fechainicial: initialDate, fechafinal: finalDate })
  );
}

type DataTipo = {
  TipoConsumo: string;
  Linea: string;
  Perdidas: number;
};

function sortArrayOfJSON(arr: any[], key: string, order: string) {
  if (order === "asc") {
    return arr.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  } else if (order === "desc") {
    return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
  } else {
    return arr;
  }
}

export async function getTramosCliente(initialDate: string, finalDate: string) {
  const data: DataTipo[] = await getData(
    "/tramos-cliente",
    JSON.stringify({ fechainicial: initialDate, fechafinal: finalDate })
  );

  const tramos: string[] = [];
  const consumos: string[] = [];

  for (const item of data) {
    const tramo = item.Linea;
    if (!tramos.includes(tramo)) {
      tramos.push(tramo);
    }
  }

  for (const item of data) {
    const consumo = item.TipoConsumo;
    if (!consumos.includes(consumo)) {
      consumos.push(consumo);
    }
  }

  const datos = consumos.map((marker) =>
    sortArrayOfJSON(
      tramos.map((marker2) => {
        return {
          TipoConsumo: marker,
          Linea: marker2,
          Datos: data
            .filter(
              (markerF) =>
                markerF.TipoConsumo === marker && markerF.Linea === marker2
            )
            .map((markerM) => markerM.Perdidas),
        };
      }),
      "Linea",
      "asc"
    )
  );

  return {datos, unProcess: data};
}
