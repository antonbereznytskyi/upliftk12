const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} inline-flex items-center px-16 py-3 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button
