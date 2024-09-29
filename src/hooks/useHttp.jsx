// import toast from 'react-hot-toast';
// // import Loader from '/src/components/Loader/Loader.jsx'
// import { useEffect, useState } from "react"
// // import { useParams } from "react-router-dom";


// export const useHttp = (fn, param) => {
//     // const { movieId } = useParams();
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
//     const getReviews = async () => {
//       setLoading(true);
//       try {
//         const data = await fn(param);
//         if (data && data.results) {
//           setData(data.results); 
//         } else {
//           setData(null); 
//         }
//       } catch {
//         toast.error('An error occurred while retrieving feedback. Please try again.')
//         setData(null);
//       } finally {
//         setLoading(false); 
//       }
//     };
//     getReviews();
//     }, [fn, param]);
    
    
//     // if (loading) {
//     // return <Loader />;
//     // }

//     return [data, setData, loading]
// };   