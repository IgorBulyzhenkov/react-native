import { Provider } from "react-redux";
import store from "./src/redux/store";
import Main from "./src/Main/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
