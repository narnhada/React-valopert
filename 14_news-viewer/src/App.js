// import React, { useState, useCallback } from 'react';
import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
// import NewsList from './components/NewsList';
// import Categories from './components/Categories';

const App = () => {
  // const [category, setCategory] = useState('all');
  // const onSelect = useCallback((category) => setCategory(category), []);
  return (
    // <>
    //   <Categories category={category} onSelect={onSelect} />
    //   <NewsList category={category} />
    // </>
    <Route path="/:category?" component={NewsPage} />
  );
};

export default App;

// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState(null);
//   const onClick = async () => {
//     try {
//       await axios
//         .get('http://jsonplaceholder.typicode.com/todos/1')
//         .then((response) => {
//           setData(response.data);
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>
//       {data && (
//         <textarea
//           row={7}
//           value={JSON.stringify(data, null, 2)}
//           readOnly={true}
//         />
//       )}
//     </div>
//   );
// };

// export default App;
