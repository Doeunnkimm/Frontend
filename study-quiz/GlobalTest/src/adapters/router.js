import { Navigate, createBrowserRouter } from "react-router-dom";
import ReducerQ1Page from "../domain/1_reducer/components/pages/Q1";
import ContextQ1Page from "../domain/2_context/components/pages/Q1";
import ContextQ2Page from "../domain/2_context/components/pages/Q2";

import ReduxQ1Page from "../domain/3_redux/components/pages/Q1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/1_reducer/q1"} />,
  },
  {
    path: "/1_reducer",
    children: [
      {
        path: "q1",
        element: <ReducerQ1Page />,
      },
    ],
  },
  {
    path: "/2_context",
    children: [
      {
        path: "q1",
        element: <ContextQ1Page />,
      },
      {
        path: "q2",
        element: <ContextQ2Page />,
      },
    ],
  },
  {
    path: "/3_redux",
    children: [
      {
        path: "q1",
        element: <ReduxQ1Page />,
      },
    ],
  },
]);
export default router;
