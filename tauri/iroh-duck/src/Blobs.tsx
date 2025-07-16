import React, { useState, useEffect } from "react";

import BlobRanges from "./BlobRanges";

export default function Blobs() {
  // State to store the fetched data
  const [data, setData] = useState(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to manage any potential error during fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/blob');
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json); // Set your data to state
        setIsLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        setError(error.message); // Handle any errors
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once on mount

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {/* {JSON.stringify(data)} */}
      {data.map((blob: any) => <BlobRanges key={blob.id} hash={blob.hash} ranges={blob.ranges} size={blob.size} />)}
    </div>
  );
}