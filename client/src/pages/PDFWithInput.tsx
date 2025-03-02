import React, { useState } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { DataTypes } from '../types/DataTypes.types'


const PDFWithInput = () => {

    // State to store input data with default values 
    const [data, setData] = useState<DataTypes>({
        name: "",
        age: null,
        price: null,
        receiptId: "",
    })


    //Function for storing input datas
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData((prev) => ({ ...prev, [name]: value }))
    }

    //Function to send input data to the backend, generate a PDF, and then fetch the generated PDF to download it.
    const downloadPDF = async () => {
        try {
            // Send input data to the backend for PDF creation
            await axios.post("http://localhost:3000/create-pdf", data)
                .then(() =>
                    // Fetch the generated PDF file from the server
                    axios.get("http://localhost:3000/fetch-pdf",
                        { responseType: "blob" } // Expect a binary file response
                    ))
                .then((res) => {
                    // Create a blob object from the response data
                    const pdfBlob = new Blob([res.data], { type: "application/pdf" })
                    // Trigger a file download with the generated PDF
                    saveAs(pdfBlob, "newPDF.pdf")
                })

        } catch (err) {
            console.log(err);

        }
    }

    return (
        <div>
            <input type="text" name="name" placeholder='Name' onChange={handleChange} />
            <input type="number" name="age" placeholder='Age' onChange={handleChange} />
            <input type="number" name="price" placeholder='Price' onChange={handleChange} />
            <input type="string" name="receiptId" placeholder='Recipt ID' onChange={handleChange} />
            <button onClick={downloadPDF}>DownLoad PDF</button>

        </div>
    )
}


export default PDFWithInput
