import ChartLine from '@/components/smallComponents/ChartLine'
import AppLayout from '@/components/Layouts/AppLayout'
import ProgressBar from '@/components/smallComponents/ProgressBar'
import ReportCard from '@/components/smallComponents/ReportCard'
import Head from 'next/head'
import Image from 'next/image'

const Dashboard = () => {
    return (
        <AppLayout title="Dashboard">
            <Head>
                <title>Dashboard</title>
            </Head>

            <div className="py-12 ml-11 font-prmiary">
                {/* Header Section */}
                <h1 className="text-2xl font-primary text-gray-700">
                    Hi, Mehul Shah
                </h1>
                <span className="text-gray-500">
                    Welcome back to Uplift K12
                </span>
                {/* Report Analytics Section */}
                <div className="grid grid-cols-4 gap-4 mt-5 pr-8">
                    <ReportCard
                        title="Total Session Time"
                        number="12Hr  50mins"
                        diffPercent={15}></ReportCard>
                    <ReportCard
                        title="Total Lessons"
                        number="30"
                        diffPercent={-15}></ReportCard>
                    <ReportCard
                        title="Total Classes"
                        number="3"
                        diffPercent={35}></ReportCard>
                    <ReportCard
                        title="Total Students"
                        number="25"
                        diffPercent={12}></ReportCard>
                </div>
                {/* Session Time and Student Analytics by Chart Section */}
                <div className="grid grid-cols-4 gap-4 mt-5 pr-8">
                    <div className="col-span-3">
                        <ChartLine></ChartLine>
                    </div>
                    <div className="px-8 py-4 rounded-lg border">
                        <h3 className="font-primary text-xl text-gray-600">
                            Student Analytics
                        </h3>
                        <ProgressBar
                            label={'Jakarta'}
                            width={`23%`}
                            color={'#0000ff'}></ProgressBar>
                        <ProgressBar
                            label={'Bandung'}
                            width={`37%`}
                            color={'#0000ff'}></ProgressBar>
                        <ProgressBar
                            label={'Semarang'}
                            width={`28%`}
                            color={'#0000ff'}></ProgressBar>
                        <ProgressBar
                            label={'Surabaya'}
                            width={`20%`}
                            color={'#0000ff'}></ProgressBar>
                        <ProgressBar
                            label={'Purbalingga'}
                            width={`15%`}
                            color={'#0000ff'}></ProgressBar>
                    </div>
                </div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Position
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Status
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        src="/docs/images/people/profile-picture-1.jpg"
                                        width={40}
                                        height={40}
                                        alt="Jese image"
                                    />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            Neil Sims
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            neil.sims@flowbite.com
                                        </div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">React Developer</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{' '}
                                        Online
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <a
                                        href="#"
                                        type="button"
                                        data-modal-toggle="editUserModal"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit user
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        src="/docs/images/people/profile-picture-3.jpg"
                                        width={40}
                                        height={40}
                                        alt="Jese image"
                                    />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            Bonnie Green
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            bonnie@flowbite.com
                                        </div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">Designer</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{' '}
                                        Online
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <a
                                        href="#"
                                        type="button"
                                        data-modal-toggle="editUserModal"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit user
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        width={40}
                                        height={40}
                                        src="/docs/images/people/profile-picture-2.jpg"
                                        alt="Jese image"
                                    />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            Jese Leos
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            jese@flowbite.com
                                        </div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">Vue JS Developer</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{' '}
                                        Online
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <a
                                        href="#"
                                        type="button"
                                        data-modal-toggle="editUserModal"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit user
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        width={40}
                                        height={40}
                                        src="/docs/images/people/profile-picture-5.jpg"
                                        alt="Jese image"
                                    />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            Thomas Lean
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            thomes@flowbite.com
                                        </div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">UI/UX Engineer</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{' '}
                                        Online
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <a
                                        href="#"
                                        type="button"
                                        data-modal-toggle="editUserModal"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit user
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        src="/docs/images/people/profile-picture-4.jpg"
                                        width={40}
                                        height={40}
                                        alt="Jese image"
                                    />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            Leslie Livingston
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            leslie@flowbite.com
                                        </div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">SEO Specialist</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{' '}
                                        Offline
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <a
                                        href="#"
                                        type="button"
                                        data-modal-toggle="editUserModal"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit user
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
