export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: StatItem[];
}

export interface StatItem {
  base_stat: number;
  stat: { name: string };
}
