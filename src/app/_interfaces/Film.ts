export interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: Date;
    edited: Date;
    url: string;
}

export function getDate(film: Film): number {
  const yearString = film.release_date.substring(0, 4);
  return parseInt(yearString, 10);
}

