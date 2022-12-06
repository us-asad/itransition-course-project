import axios from 'axios';
import { Header } from 'components'
import { getCookie } from 'cookies-next';
import { changeUser } from 'redux/slices/user';
import { wrapper } from 'redux/store';
import '@splidejs/react-splide/css';
import 'styles/globals.css'
import { setAuthHeader } from 'utils/functions';
import { Provider } from 'react-redux'

function MyApp({ Component, ...rest }) {
  const { store, pageProps } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <main className='bg-purple-100 min-h-screen'>
        <Header />
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx: { req, res } }) => {
  try {
    const token = getCookie("token", { req, res });
    if (token) {
      const userRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/auth/check-token`, setAuthHeader(token));

      if (userRes?.data?.ok) store.dispatch(changeUser(userRes?.data?.data))
    }
  } catch (ex) {
    console.error(ex);
  }
});

export default wrapper.withRedux(MyApp);
