import React from 'react'

const PDFComponent = ({ classData, data }) => {
    return (
        <div style={{ padding: '10px' }} id="pdf">
            <div
                style={{
                    border: 'double 1px black',
                    fontSize: '20px',
                    textAlign: 'center',
                }}>
                <p>Class : {classData.class}</p>
                <p>Class Member : {classData.member}</p>
                <p>Student List</p>
            </div>
        </div>
    )
}

export default PDFComponent
