const ProgressBar = ({ label, width, color }) => (
    <div className="mt-6">
        <div className="mb-1 text-base font-primary text-gray-800 dark:text-black">
            {label} <span className="float-right text-gray-400">{width}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 mb-4 dark:bg-gray-700">
            <div
                className={`h-3 rounded-full`}
                style={{ width: width, background: color }}></div>
        </div>
    </div>
)

export default ProgressBar
