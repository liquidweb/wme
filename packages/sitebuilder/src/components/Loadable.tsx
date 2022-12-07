import { Suspense } from '@wordpress/element';
import { Loading } from './Loading';

const Loadable = <T extends { fullscreen?: boolean }>(Component: React.ComponentType<T>) => (props: T) => {
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
