import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '~/components/auth/UserContext'
import Main from '~/components/root/Main'
import { Head } from '~/components/shared/Head'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HelmetProvider>
                <AuthProvider>
                    {/*<Head title="Your App Title" />*/}
                    <Head />
                    <Main />
                </AuthProvider>
            </HelmetProvider>
        </LocalizationProvider>
    )
}
