import React from 'react'

export default function BlobRanges({ hash, ranges, size }: { hash: string, ranges: number[], size: number }) {
  const blocks = Math.ceil(size / 1024);

  // TODO - for now this assumes a single range, but we should be able to handle multiple ranges
  const left = (ranges[0] / blocks) * 100;
  const width = ((ranges[1] - ranges[0]) / blocks) * 100;
 
  return (
    <div>
      <div className='flex'>
        <p>{hash}</p>
        <p className='ml-auto'>{humanSize(size)}</p>
      </div>
      <div style={{ position: 'relative', width: '100%', height: '1em' }} className='bg-zinc-400'>
        <div style={{ position: 'absolute', left: `${left}%`, width: `${width}%`, height: '100%' }} className='bg-green-500' />
      </div>
      {/* <p>Blocks {blocks}</p>
      <p>Ranges {ranges.join(', ')}</p> */}
    </div>
  )
}

function humanSize(size: number): string {
  if (size < 1024) {
    return `${+size.toFixed(2)}B`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${+size.toFixed(2)}KB`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${+size.toFixed(2)}MB`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${+size.toFixed(2)}GB`;
  }
  size /= 1024;
  return `${+size.toFixed(2)}TB`;
}