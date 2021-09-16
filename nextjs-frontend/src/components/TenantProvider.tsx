import { createContext, useEffect, useState } from "react";
import { useAuthSwr } from "../hooks/useAuthSwr";
import { isEqual } from "lodash"; //lodash

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  balance: number;
}

const TenantContext = createContext<Tenant>(null as any);

export default TenantContext;

export const TenantProvider: React.FunctionComponent = (props) => {
  const [tenant, setTenant] = useState<Tenant>();
  const { data, error } = useAuthSwr("/my-account", {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (data==null) {
        console.error('tenant null');
    }
    if (!isEqual(data, tenant)) {
        setTenant(data);
    }
    if (error) {
        console.error(error);
    }    
  }, [data, error, tenant]);

  return (
    <TenantContext.Provider value={tenant as Tenant}>
      {props.children}
    </TenantContext.Provider>
  );
};