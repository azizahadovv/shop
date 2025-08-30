import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";


export default function Category() {
    const [category, setCategory] = useState([])
    useEffect(() => {
        getCategory()
    }, []);

    function getCategory() {
        axios.get("http://localhost:8080/v1/category").then(res => {
            setCategory(res.data)
        }).catch(err => toast.error(err.message))
    }


    return <div>
        {category.map((item) => (<select>
                <option value={item.name}>{item.name}</option>
            </select>))}
    </div>
}