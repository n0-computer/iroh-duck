## Iroh Duckdb

### Example Run

```
> cargo run -- --node-id 2ovpybgj3snjmchns44pfn6dbwmdiu4ogfd66xyu72ghexllv6hq --addrs 192.168.1.148:11204 --data-hash wejw4kn3kdoxanbuejyamt4yxvjiclilto7hitij5vjjkxjhzlqa 'SELECT count() FROM read_parquet(DATA)'

+--------------+
| count_star() |
+--------------+
| 200000000    |
+--------------+
```
