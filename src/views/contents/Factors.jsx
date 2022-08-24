import { useEffect, useState } from 'react';
import Table from '../components/Table';
import EditPost from '../components/modals/EditPost';
import { _factorsList } from './../../services/Person';
import Factor from './../components/modals/Factor';

const Factors = () => {

    const [factors, setFactors] = useState(null);
    const [data, setData] = useState(null);

    const getFactors = async () => {
        try {
            const respons = await _factorsList();
            console.log(respons.data.list);
            if (respons.data.statusText === "ok") {
                setFactors(respons.data.list);
                setData(respons.data.list[0]);
            }
        } catch (error) { }
    }

    const priceCalculator = (products) => {
        let price = 0;
        products.map((product) => {
            price += parseInt(product.sale_price) * parseInt(product.number);
        })
        return price;
    }
    const columens = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">
                    <button type="button" className="btn btn-warning m-2" onClick={() => { setData(row); document.getElementById('Modal_Factor_open').click(); }}>مشاهده</button>
                </th>
                <th key={generateID()} scope="col" className="text-center">{row.factor_id}</th>
                <th key={generateID()} scope="col" className="text-center">{priceCalculator(row.factor_products)}</th>
                <th key={generateID()} scope="col" className="text-center">{row.person.person_info.name + " " + row.person.person_info.family}</th>
            </>
        );
    }

    useEffect(() => {
        getFactors();
    }, [])

    return (
        <>
            {(factors != null && data != null) &&
                <>
                    <Factor data={data} onSubmit={() => getFactors()} />
                    <Table titles={[
                        "عملیات",
                        "ID",
                        "قیمت",
                        "خریدار",
                    ]} data={factors} select={false} columens={columens} />
                </>
            }
        </>
    );
}


export default Factors;
