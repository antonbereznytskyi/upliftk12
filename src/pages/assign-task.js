import AppLayout from '../components/Layouts/AppLayout'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import AssignTaskTable from '@/components/Tables/AssignTaskTable'

const AssignTask = () => {
    return (
        <div>
            <AppLayout title="Assign Task">
                <Head>
                    <title>Assign Task</title>
                </Head>
                <div className="py-10 px-11 bg-gray-100 h-full">
                    <div className="container mx-auto">
                        <AssignTaskTable />
                    </div>
                </div>
            </AppLayout>
        </div>
    )
}
export default AssignTask
