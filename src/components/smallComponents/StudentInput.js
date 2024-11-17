const StudentInput = ({ label, onChange, value }) => {
    return (
        <div className="flex text-start my-5 items-center">
            <p className="w-1/3">{label}:</p>
            <input
                className="border p-1 rounded-md w-2/3 focus:outline-none"
                value={value}
                onChange={onChange}></input>
        </div>
    )
}
export default StudentInput
