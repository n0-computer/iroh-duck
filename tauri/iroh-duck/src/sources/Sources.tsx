import React from 'react';
import { Node, Source, Aggregation, Queryable } from './types';
import SourcesTable from './SourcesTable';

const mockQuery = `SELECT * from read_parquet("https://b5.gateway.lol/ticket/blobabk62aofuwwwu5zb5ocvzj5v3rtqt6siglyuhoxhqtu4fxravvoteajcnb2hi4dthixs65ltmuys2mjomrsxe4bonfzg62bonzsxi53pojvs4lydaac2cyt22erablaraaa5ciqbfiaqj7ya6cbpuaaaaaaaaaaaahjcealf2e4dfgzes5ugswuah3v5im2fdpef6dikysbbinjkxdd6zj2fzu/flights_1m.parquet") WHERE FL_DATE > '2006-01-01' LIMIT 5;`;

const nodes: Node[] = [
  {
    id: "qmfiisenAEn",
    addr: "qmfiisenAEn",
    address: "qmfiisenAEn",
    latlng: [1, 1]
  },
  {
    id: "1",
    addr: "1",
    address: "1",
    latlng: [1, 1]
  },
]

const sources: Source[] = [
  {
    id: "qmfiisenAEn",
    hash: "qmfiisenAEn",
    timestamp: 2,
    name: "box_2045_packet_logs",
    node: nodes[0],
    schema: {},
    mime: "parquet"
  },
  {
    id: "ajsdkfl",
    hash: "ajkdlfEJijjs",
    name: "box_2046_packet_logs",
    timestamp: 1,
    node: nodes[1],
    schema: {},
    mime: "parquet"
  }
]

const aggregations: Aggregation[] = [
  {
    id: "qoiweur",
    name: "chicago_metro_boxes_packet_logs",
    note: "Chicago",
    tags: ["chicago"],
    sources: [
      sources[0],   
      sources[1],   
    ]
  }
];

const items: Queryable[] = [...sources, ...aggregations];

export default function Sources() {
  return (
    <div>
      <h3 className='text-lg text-zinc-300 font-bold mb-5'>Sources</h3>
      <SourcesTable items={items} loading={false} />
    </div>
  )
}

function QueryableItem({ onClick, item }: { onClick: (value: Queryable) => void, item: Queryable }){
  const { id, name, tags = [] } = item;
  // const type = ('sources' in item) ? 'aggregation' : 'source';
  const isAggregation = 'sources' in item;

  return (
    <div className='text-zinc-200 mb-5 cursor-pointer' onClick={() => {
      onClick(mockQuery);
    }}>
      <h4 className='font-bold font-mono'>{name}</h4>
      <p className='text-sm text-zinc-300'>
        {isAggregation ? `aggregation of ${item.sources.length} sources` : 'source'}
      </p>
    </div>
  )
}