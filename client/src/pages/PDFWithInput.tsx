import React, { useState } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { DataTypes } from '../types/DataTypes.types'


const PDFWithInput = () => {
    const [data, setData] = useState<DataTypes>({
        name: "",
        age: null,
        price: null,
        receiptId: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData((prev) => ({ ...prev, [name]: value }))
    }

    const downloadPDF = async () => {
        try {
            await axios.post("http://localhost:3000/create-pdf", data)
                .then(() => axios.get("http://localhost:3000/fetch-pdf", { responseType: "blob" }))
                .then((res) => {
                    const pdfBlob = new Blob([res.data], { type: "application/pdf" })

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
