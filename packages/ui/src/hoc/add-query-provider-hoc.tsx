import type React from 'react';
import type { ReactElement } from 'react';
import type { Location } from 'history';
import { useMemo } from 'react';
import {
  BrowserRouter,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

interface RouteProps {
  children: React.FunctionComponent;
}

const RouteAdapter: React.FC<RouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace(locationTemp:Location) {
        navigate(locationTemp, { replace: true, state: locationTemp.state });
      },
      push(locationTemp:Location) {
        navigate(locationTemp, { replace: false, state: locationTemp.state });
      },
    }),
    [navigate],
  );
  return children({ history: adaptedHistory, location });
};

export function addQueryProviderHoc(WrappedComponent:React.FunctionComponent) {
  return (props:ReactElement) => (
    <BrowserRouter>
      <QueryParamProvider
        ReactRouterRoute={RouteAdapter as unknown as React.FunctionComponent}
        stringifyOptions={{
          skipNull: true,
          skipEmptyString: true,
        }}
      >
        <WrappedComponent {...props} />
      </QueryParamProvider>
    </BrowserRouter>
  );
}
