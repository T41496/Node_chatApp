import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Loading from "./components/Loading/Loading";

const ChatComponent = React.lazy(() => import("./components/Chat/Chat"));

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={() => {
        return  <Suspense fallback={<Loading />}>
                  <ChatComponent />
                </Suspense>
      }} />
    </Router>
  )
};

export default App;