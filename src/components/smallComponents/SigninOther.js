const SigninOther = ({ title, svg, onClick }) => (
    <button
        className="px-6 py-3 mt-4 w-full font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
        onClick={onClick}>
        {svg}
        {title}
    </button>
)

export default SigninOther
