import { useState, useEffect } from "react";
import { _DeleteProduct, _ProductList } from "../../services/Product";
import Table from './../components/Table';
import { toast } from 'react-toastify';
import EditProduct from './../components/modals/EditProduct';

const ProductList = () => {

    const [products, setProducts] = useState(null);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState(null);

    const getProducts = async () => {
        try {
            const respons = await _ProductList();
            if (respons.data.statusText === "ok") {
                setProducts(respons.data.list);
                setData(respons.data.list[0]);
                setUpdate(!update);
            }
        } catch (error) { }
    }
    const deleteProduct = async (product_id) => {
        try {
            const respons = await _DeleteProduct({ product_id });
            console.log(respons);
            if (respons.data.statusText === "ok") {
                getProducts();
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const columens = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">
                    <button type="button" className="btn btn-danger m-2" onClick={() => deleteProduct(row.product_id)}>حذف</button>
                    <button type="button" className="btn btn-success m-2" onClick={() => {
                        setData(row);
                        document.getElementById('Modal_EditProduct_open').click();
                    }}>تغییر</button>
                </th>
                <th key={generateID()} scope="col" className="text-center">{row.product_id}</th>
                <th key={generateID()} scope="col" className="text-center">{row.stock}</th>
                <th key={generateID()} scope="col" className="text-center">{row.sale_price}</th>
                <th key={generateID()} scope="col" className="text-center">{row.price}</th>
                <th key={generateID()} scope="col" className="text-center">{row.name}</th>
            </>
        );
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            {(products != null && data != null) ?
                <>
                    <EditProduct data={data} onSubmit={() => getProducts()} />
                    <Table titles={[
                        "عملیات",
                        "ID",
                        "موجودی",
                        "قیمت فروش",
                        "قیمت",
                        "نام کالا",
                    ]} data={products} select={false} columens={columens} />
                </>
                :
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80%" }}>
                    <div> هیچ کالایی وجود ندارد</div>
                </div>
            }
        </>
    );
}
export default ProductList;
