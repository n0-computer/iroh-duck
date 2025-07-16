
export type Metadata = {
  name?: string;
  note?: string;
  tags?: string[];
};

export type Node = Metadata & {
  id: string;
  addr: string;

  address?: string;
  latlng?: number[];
};

export type Source = Metadata & {
  id: string;
  hash: string;
  timestamp: Date | number;

  node: Node;
  schema: any;
  mime: string;
}

export type Aggregation = Metadata & {
  id: string;
  sources: Source[];
};

export type Queryable = Source | Aggregation;