const AuthCard = ({ children }) => (
    <div className="xl:h-[calc(100%-104px)] md:h-auto absolute min-w-full flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div className="xl:w-[1000px] lg:w-4/5 sm:w-4/5 mt-6 px-6 py-4 bg-white shadow-md  sm:rounded-lg overflow-auto">
            {children}
        </div>
    </div>
)

export default AuthCard
