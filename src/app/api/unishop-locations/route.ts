const SOURCE_URL =
  "https://redeunishop.com.br/uploads/unishop-map/locations.json?v=v1";

type SourceStore = {
  id?: string | number;
  nome?: string;
  tel?: string;
  addr?: string;
  endereco?: string;
};

type SourcePayload = SourceStore[] | { stores?: SourceStore[] };

type CityLocation = {
  name: string;
  state: string;
  stores: number;
  locations: StoreLocation[];
};

type StoreLocation = {
  id: string;
  name: string;
  address: string;
  phone?: string;
};

const stateNames: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function fixSourceEncoding(value: string) {
  if (!/[ÃÂ]/.test(value)) return value;

  const bytes = Uint8Array.from(value, (character) =>
    character.charCodeAt(0) <= 255 ? character.charCodeAt(0) : 63,
  );

  return new TextDecoder("utf-8").decode(bytes);
}

function cleanCityName(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .replace(/(^|[\s'-])\p{L}/gu, (letter) => letter.toLocaleUpperCase("pt-BR"));
}

function getCityAndState(address: string) {
  const match = address.match(/ - ([A-Z]{2}), Brasil\s*$/);

  if (match?.index === undefined) return null;

  const rawCity = address.slice(0, match.index).split(",").at(-1)?.trim();
  const state = match[1];

  if (!rawCity || !stateNames[state]) return null;

  const city = fixSourceEncoding(rawCity);
  const hadBrokenSequence = /[\u0080-\u009f]/.test(rawCity) || city.includes("�");
  const brokenKey = city
    .toUpperCase()
    .replace(/[^A-Z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  let correctedCity = city;

  if (hadBrokenSequence && brokenKey.includes("IGARAP")) correctedCity = "Igarapé";
  if (hadBrokenSequence && brokenKey.includes("RIBEIR") && brokenKey.includes("PRETO")) {
    correctedCity = "Ribeirão Preto";
  }
  if (hadBrokenSequence && brokenKey.includes("PAULO") && brokenKey.startsWith("S")) {
    correctedCity = "São Paulo";
  }

  return { city: cleanCityName(correctedCity), state };
}

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      headers: { Accept: "application/json" },
      next: { revalidate: 21600 },
    });

    if (!response.ok) throw new Error(`Location source returned ${response.status}`);

    const payload = (await response.json()) as SourcePayload;
    const stores = Array.isArray(payload) ? payload : (payload.stores ?? []);
    const cityIndex = new Map<string, CityLocation>();

    for (const store of stores) {
      const address = fixSourceEncoding(store.addr ?? store.endereco ?? "");
      const location = getCityAndState(address);
      if (!location) continue;

      const key = `${location.state}:${normalize(location.city)}`;
      const existing = cityIndex.get(key);
      const storeLocation: StoreLocation = {
        id: String(store.id ?? `${key}-${existing?.locations.length ?? 0}`),
        name: fixSourceEncoding(store.nome?.trim() || "Unishop"),
        address,
        ...(store.tel?.trim() ? { phone: store.tel.trim() } : {}),
      };

      cityIndex.set(key, {
        name: existing?.name ?? location.city,
        state: location.state,
        stores: (existing?.stores ?? 0) + 1,
        locations: [...(existing?.locations ?? []), storeLocation],
      });
    }

    const cities = [...cityIndex.values()]
      .map((city) => ({
        ...city,
        locations: city.locations.sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    const states = [...new Set(cities.map((city) => city.state))].sort();

    return Response.json(
      {
        cities,
        states,
        totals: { stores: stores.length, cities: cities.length, states: states.length },
        updatedAt: new Date().toISOString(),
        source: "Rede Unishop",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return Response.json(
      { error: "Não foi possível atualizar a lista de unidades agora." },
      { status: 502 },
    );
  }
}
