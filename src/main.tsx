import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import './i18n';
import 'antd-css-utilities/utility.min.css';
import { SidebarProvider } from './common/providers/sidebar.provider.tsx'
import { PageTitleProvider } from './common/providers/pageTitle.provider.tsx'
import { PaginationProvider } from './common/providers/pagination.provider.tsx'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          fontFamily: `"Poppins", "Open sans" `,
          fontWeightStrong: 500,
        }
      }}>
        <SidebarProvider>
          <PageTitleProvider>
            <PaginationProvider >
              <App />
            </PaginationProvider>
          </PageTitleProvider>
        </SidebarProvider>
      </ConfigProvider>
    </BrowserRouter>
  </Provider>

)
