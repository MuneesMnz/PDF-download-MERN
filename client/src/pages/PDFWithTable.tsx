import { DataTypes } from '../types/DataTypes.types';
import axios from 'axios';
import { saveAs } from 'file-saver'


const dummyData: DataTypes[] = [
    { name: "John Doe", age: 30, price: 100, receiptId: "R-001" },
    { name: "Jane Smith", age: 25, price: 150, receiptId: "R-002" },
    { name: "Alice Johnson", age: 40, price: 200, receiptId: "R-003" },
    { name: "Bob Williams", age: 35, price: 120, receiptId: "R-004" },
    { name: "Charlie Brown", age: 28, price: 180, receiptId: "R-005" },
];

const PDFWithTable = () => {

    const handleDownload = async (data: DataTypes) => {
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
            <h2>List Of Users</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>SL Number</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Price</th>
                        <th>Receipt ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map((item, ind: number) => <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.price}</td>
                        <td>{item.receiptId}</td>
                        <td><button onClick={() => handleDownload(item)}>Download</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default PDFWithTable
