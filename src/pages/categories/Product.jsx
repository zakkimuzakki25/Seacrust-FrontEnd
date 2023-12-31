import NavBar from "../../components/Layout/NavBar"
import Footer from "../../components/Layout/Footer"
import MapBox from "../../components/Map/MapBox"
import CardProduct from "../../components/Card/CardProduct"
import { useEffect, useState } from "react"
import { Base } from "../../api/api"
import { useParams } from "react-router"

const Product = () => {
    const { categoryParam } = useParams('')
    const category = categoryParam.split('-')
    const [dataProduk, setdataProduk] = useState([])
    const token = window.localStorage.getItem('token')

    const GetProduct = () => {
        Base.get(`/produk/${category[0]}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const dp = res.data.data
            if (dp != null) {
                setdataProduk(dp)
            }
            console.log(dataProduk)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        GetProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <div className="flex flex-col min-h-screen bg-slate-100 sm:bg-BGtoTop bg-fixed gap-4">
            <NavBar />
            <div className="flex flex-col items-center justify-center pt-16 sm:pt-24 box-border">
                <h1 className="text-center text-2xl sm:text-4xl font-medium text-palleteBlue sm:mt-5">{category[1].charAt(0).toUpperCase() + category[1].slice(1)}</h1>
            </div>
            {dataProduk.length > 0 ? (
                <>
                    <MapBox />
                    <div className="w-full justify-center lg:mt-8 px-3 lg:px-14 shrink-0 box-border">
                        <div className=" justify-center w-fit lg:gap-0 flex flex-wrap">
                            {dataProduk.map((list, index) => {
                                return (
                                    <div key={index} className="my-3 mx-4">
                                        <CardProduct data={list}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="h-full flex flex-col flex-1 justify-center items-center">
                        <div className="bg-white p-14 rounded-2xl shadow-lg w-fit border-2">
                            <div className="w-full flex flex-col justify-center text-2xl font-bold text-gray-600 items-center h-full">
                                Belum ada produk:(
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </div>
    )
}

export default Product