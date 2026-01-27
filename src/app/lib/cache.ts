// import redis from "@/app/lib/redis";


// export async function getOrSetCache<T>(
//   key: string,
//   ttlSeconds: number,
//   fetchFn: () => Promise<T>
// ): Promise<T> {
//     //check if avaialable value
//     const cached = await redis.get(key);
//   if (cached) {
//     return JSON.parse(cached) as T;
//   }
//     // if not fetch fn  
//   const freshData = await fetchFn();

//   // Store in Redis if data exists
//   if (freshData) {
//     await redis.set(key, JSON.stringify(freshData), "EX", ttlSeconds);
//   }

//   return freshData;
// }
