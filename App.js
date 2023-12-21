import MyRouter from './src/router';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyRouter />
        </PersistGate>
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  );
}