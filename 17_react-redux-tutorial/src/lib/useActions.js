// import { bindActionCreators } from "redux";
// import { useDispatch } from "react-redux";
// import { useMemo } from "react";

// export default function useActions(actions, deps) {
//   const dispatch = useDispatch();
//   return useMemo(
//     () => {
//       if (Array.isArray(actions)) {
//         return actions.map((a) => bindActionCreators(a, dispatch));
//       }
//       return bindActionCreators(actions, dispatch);
//     },
//     deps ? [dispatch, ...deps] : deps
//   );
// }

// 권장사항은 아닌가보다 warning 많이 뜸
