import React, {useEffect, useState} from "react";
import axios from "axios";


export default function CategoryPage() {

    const [getCategory, setGetCategory] = useState([])

    useEffect(() => {

    }, []);

    function getCategory(){
        axios.get('http://localhost:8080/v1/')
    }


    return <div>

    </div>
}