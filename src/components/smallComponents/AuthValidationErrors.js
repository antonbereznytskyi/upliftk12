const AuthValidationErrors = ({ errors = [], ...props }) => (
    <>
        {errors.length > 0 && (
            <div {...props}>
                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {<li className="list-none">{errors}</li>}
                </ul>
            </div>
        )}
    </>
)

export default AuthValidationErrors
