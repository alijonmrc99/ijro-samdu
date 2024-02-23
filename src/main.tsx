import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { HashRouter } from 'react-router-dom'
import './i18n';
import 'antd-css-utilities/utility.min.css';
import { SidebarProvider } from './common/providers/sidebar.provider.tsx'
import { PageTitleProvider } from './common/providers/pageTitle.provider.tsx'
import { PaginationProvider } from './common/providers/pagination.provider.tsx'
import { ConfigProvider } from 'antd'
import { FilterProvider } from './common/providers/filter.provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HashRouter>
      <ConfigProvider theme={{
        token: {
          fontFamily: `"Poppins", "Open sans" `,
          fontWeightStrong: 500,
        }
      }}>
        <SidebarProvider>
          <PageTitleProvider>
            <PaginationProvider >
              <FilterProvider>
                <App />
              </FilterProvider>
            </PaginationProvider>
          </PageTitleProvider>
        </SidebarProvider>
      </ConfigProvider>
    </HashRouter>
  </Provider>

)
