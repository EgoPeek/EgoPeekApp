import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(url);
      await setList((prev) => [...prev, ...res.data]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;

// import useFetch from "hooks/useFetch";

// function App() {
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const { loading, error, list } = useFetch(query, page);
//   const loader = useRef(null);

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleObserver = useCallback((entries) => {
//     const target = entries[0];
//     if (target.isIntersecting) {
//       setPage((prev) => prev + 1);
//     }
//   }, []);

//   useEffect(() => {
//     const option = {
//       root: null,
//       rootMargin: "20px",
//       threshold: 0
//     };
//     const observer = new IntersectionObserver(handleObserver, option);
//     if (loader.current) observer.observe(loader.current);
//   }, [handleObserver]);

//   return (
//     <div className="App">
//       <h1>Infinite Scroll</h1>
//       <h2>with IntersectionObserver</h2>
//       <input type="text" value={query} onChange={handleChange} />
//       <div>
//         {list.map((item, i) => (
//           <div key={i}>{item}</div>
//         ))}
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error!</p>}
//       <div ref={loader} />
//     </div>
//   );
// }

// export default App;