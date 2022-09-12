import React, { Suspense, ComponentType } from 'react';
import { Loading } from './Loading';

const Loadable = <T extends {}>(Component: ComponentType<T>) => (props: T) => (
	<Suspense
		fallback={ <Loading /> }
	>
		<Component { ...props } />
	</Suspense>
);

export default Loadable;
