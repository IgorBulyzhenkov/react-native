import { Provider } from "react-redux";
import store from "./component/redux/store";
import Main from "./component/Main/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
