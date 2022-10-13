import React, { Suspense, ComponentType } from 'react';
import { Loading } from './Loading';

const Loadable = <T extends { fullscreen?: boolean }>(Component: ComponentType<T>) => (props: T) => {
	const {
		fullscreen,
	} = props;
	return (
		<Suspense
			fallback={ <Loading fullscreen={ fullscreen } /> }
		>
			<Component { ...props } />
		</Suspense>
	);
};

export default Loadable;
