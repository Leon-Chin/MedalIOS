import { StyleSheet, Text, View } from 'react-native';
import MyRouter from './src/router';
import { store } from './src/redux/store';
import { Provider } from 'react-redux'
export default function App() {
  return (
    <Provider store={store}>
      <MyRouter />
    </Provider>
  );
}