import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '~/utils/hooks/UserContext'
import { Router } from '~/routers/Router'
import { Head } from '~/components/Head/Head'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HelmetProvider>
                <AuthProvider>
                    {/*<Head title="Your App Title" />*/}
                    <Head />
                    <main>
                        <Router />
                    </main>
                </AuthProvider>
            </HelmetProvider>
        </LocalizationProvider>
    )
}
