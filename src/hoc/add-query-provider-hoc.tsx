import React, { useMemo } from 'react';
import {
  BrowserRouter,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

interface RouteProps {
  children: React.FunctionComponent;
}

interface QueryParams {
  ReactRouterRoute?: React.ComponentClass | React.FunctionComponent;
}

const RouteAdapter: React.FC<RouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace(locationTemp:any) {
        navigate(locationTemp, { replace: true, state: locationTemp.state });
      },
      push(locationTemp:any) {
        navigate(locationTemp, { replace: false, state: locationTemp.state });
      },
    }),
    [navigate],
  );
  return children({ history: adaptedHistory, location });
};

export function addQueryProviderHoc(WrappedComponent:any) {
  return (props:any) => (
    <BrowserRouter>
      <QueryParamProvider
        ReactRouterRoute={RouteAdapter}
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
