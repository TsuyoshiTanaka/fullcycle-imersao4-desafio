import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { NextPage } from "next";
import { useEffect } from "react";

const LoginPage: NextPage = () => {
    const { initialized, keycloak } = useKeycloak<KeycloakInstance>()
    
    const { authenticated, login = () => {} } = keycloak || {};

    useEffect(() => {
        if (!initialized) {
            return;
        }
        if (!authenticated) {
            login();
        }

    }, [authenticated, initialized, login]);

    return null;
};

export default LoginPage;