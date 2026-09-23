/**
 * Sector studies: the purchase questions a traveller or a buyer asks, without naming any
 * brand, put to every model on the Enroutia panel. One record per study, rendered by
 * `SectorReportSignal`. Every figure carries its denominator, and the denominator is the
 * number of models that produced a usable answer to that question, not the panel size.
 *
 * Source of each study: a one-off probe run from the Enroutia staging core container
 * (keys never printed), raw JSON kept outside the repo. Counts are literal mentions in
 * the answer text, checked by hand; they are not a quality ranking and not bookings.
 */

export type SectorBar = { name: string; count: number; note?: string };

export type SectorQuestion = {
  id: string;
  label: string;
  prompt: string;
  answered: number;
  bars: SectorBar[];
};

export type SectorError = { model: string; claim: string; fact: string };

export type SectorReport = {
  slug: string;
  datePublished: string;
  models: number;
  asked: number;
  answered: number;
  questions: SectorQuestion[];
  /** The finding the headline rests on: brand recall against booking recall. */
  contrast: { name: string; asChain: string; asHotel: string }[];
  errors: SectorError[];
};

export const hotelesMallorca: SectorReport = {
  slug: "hoteles-mallorca",
  datePublished: "2026-09-23",
  models: 16,
  asked: 64,
  answered: 64,
  questions: [
    {
      id: "general",
      label: "Un hotel, sin más",
      prompt:
        "Voy a viajar a Mallorca. Recomiéndame cinco hoteles concretos (con su nombre) y di en una frase por qué cada uno.",
      answered: 16,
      bars: [
        { name: "Cap Rocat", count: 10 },
        { name: "Belmond La Residencia", count: 8 },
        { name: "Sant Francesc Hotel Singular", count: 6 },
        { name: "Jumeirah Port Sóller", count: 5 },
        { name: "Es Princep", count: 4 },
        { name: "Algún hotel Iberostar", count: 4 },
      ],
    },
    {
      id: "familia",
      label: "En familia, con niños",
      prompt:
        "Voy a Mallorca en verano con mi pareja y dos niños pequeños. Recomiéndame cinco hoteles concretos (con su nombre) y di en una frase por qué cada uno.",
      answered: 16,
      bars: [
        { name: "Algún hotel Iberostar", count: 14, note: "sin contar uno de Menorca" },
        { name: "Zafiro Palace Alcudia", count: 8 },
        { name: "Viva Cala Mesquida y otros Viva", count: 5 },
        { name: "Algún hotel Meliá", count: 4, note: "sin contar dos Meliá que no existen" },
        { name: "Protur (Safari Park, Biomar)", count: 4 },
        { name: "Algún hotel Barceló", count: 4 },
      ],
    },
    {
      id: "adultos",
      label: "Solo adultos, en pareja",
      prompt:
        "Busco un hotel solo para adultos en Mallorca para una escapada en pareja. Recomiéndame cinco hoteles concretos (con su nombre) y di en una frase por qué cada uno.",
      answered: 16,
      bars: [
        { name: "Cap Rocat", count: 5 },
        { name: "Algún hotel Iberostar", count: 4, note: "sin contar uno de Tenerife ni uno inventado" },
        { name: "Pure Salt (Garonda, Port Adriano)", count: 4 },
        { name: "Can Cera", count: 2 },
        { name: "Secrets Mallorca Villamil", count: 2 },
        { name: "Nixe Palace", count: 2 },
      ],
    },
    {
      id: "cadenas",
      label: "Qué cadena elegir",
      prompt:
        "¿Qué cadenas hoteleras me recomiendas para alojarme en Mallorca? Nombra tres cadenas concretas y di por qué.",
      answered: 16,
      bars: [
        { name: "Meliá", count: 15 },
        { name: "Iberostar", count: 14 },
        { name: "Barceló", count: 10 },
        { name: "NH", count: 6 },
        { name: "Riu, Zafiro, Hipotels, Protur, Petit Palace", count: 1, note: "una vez cada una" },
      ],
    },
  ],
  contrast: [
    { name: "Meliá", asChain: "15 / 16", asHotel: "5 / 48" },
    { name: "Iberostar", asChain: "14 / 16", asHotel: "22 / 48" },
    { name: "Zafiro", asChain: "1 / 16", asHotel: "10 / 48" },
  ],
  errors: [
    {
      model: "Qwen3.6 35B",
      claim: "Para una escapada en pareja en Mallorca recomienda el Villa Magna y Marimurtra.",
      fact: "El Villa Magna está en Madrid y Marimurtra es un jardín botánico de Blanes.",
    },
    {
      model: "Mistral Medium",
      claim: "Recomienda el Ikos Dassia para una escapada solo adultos en Mallorca.",
      fact: "El Ikos Dassia está en Corfú, Grecia.",
    },
    {
      model: "Llama 3.3 70B",
      claim: "Recomienda el Iberostar Grand Hotel El Mirador «en primera línea de playa».",
      fact: "El Iberostar Grand El Mirador está en Tenerife.",
    },
    {
      model: "Mistral Small",
      claim: "Recomienda el Iberostar Selection Santa Eulalia, dos veces, en dos preguntas.",
      fact: "Santa Eulària está en Ibiza.",
    },
    {
      model: "Qwen3.8 27B",
      claim: "Sitúa un «Hotel Meliá Costa Blanca» en Cala d'Or en una respuesta y en Alcúdia en la siguiente.",
      fact: "El mismo modelo lo pone en dos sitios; no hay un Meliá con ese nombre en Mallorca.",
    },
    {
      model: "Qwen3.5 9B y Qwen3.8 27B",
      claim: "Recomiendan un «Hotel Son Marroig»; uno de ellos lo hace Meliá, con club infantil.",
      fact: "Son Marroig es la finca-museo del Archiduque en Deià, no un hotel.",
    },
    {
      model: "Gemma 4 26B, GLM 5.2 y Mistral Small",
      claim: "Tres de los diez modelos que recomiendan Cap Rocat lo sitúan mal: en Calvià, en la Colònia de Sant Jordi y en Cala d'Or.",
      fact: "Cap Rocat está en la bahía de Palma, junto a Cala Blava.",
    },
  ],
};
