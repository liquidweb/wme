export const useSetupCard = (props: SetupCardInterface) => {
	const { rows = [] } = props;

	const firstRowType = rows.length > 0 && rows[ 0 ]?.variant
		? rows[ 0 ].variant
		: rows[ 0 ]?.type;

	const lastRowType = rows.length > 0 && rows[ rows.length - 1 ]?.variant
		? rows[ rows.length - 1 ].variant
		: rows[ rows.length - 1 ]?.type;

	return {
		firstRowType,
		lastRowType
	};
};
