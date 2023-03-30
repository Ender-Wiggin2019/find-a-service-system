import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "~/components/auth/UserContext";
import Main from "~/components/root/Main";
import { Head } from "~/components/shared/Head";

export const App = () => {
    return (
        <HelmetProvider>
            <AuthProvider>
                <Head title="Your App Title" />
                <Main />
            </AuthProvider>
        </HelmetProvider>
    );
};
