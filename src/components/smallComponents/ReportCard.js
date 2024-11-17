const ReportCard = ({ title, number, diffPercent }) => (
    <div className="rounded-lg border px-7 py-5">
        <h3 className="font-bold text-lg text-gray-500 my-2">{title}</h3>
        <h2 className="font-extrabold text-2xl font-logo my-2">{number}</h2>
        <h4>
            <span
                className={`font-extrabold ${
                    diffPercent > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                {diffPercent}%
            </span>{' '}
            Compare with last month
        </h4>
    </div>
)

export default ReportCard
