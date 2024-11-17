export const ErrorMessage = ({
	message = 'This field is required',
}) => {
	return <span className="text-red-500 text-xs">{message}</span>;
};
