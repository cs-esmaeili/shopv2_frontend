import React, { Fragment, useEffect, useState } from "react";
import useGenerator from "../../global/Idgenerator";
import Pagination from "../components/Pagination";
import paginate from "../../global/paginate";

const Table = ({
    titles,
    data,
    columens,
    loadSomething = null,
    perPage = 8,
    select = false,
    clearSelect = false,
    selectLisener = null,
    selectedValue = null,
}) => {

    const [generateID] = useGenerator();
    const [acive, setActive] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    let pData = paginate(data, currentPage, perPage);


    useEffect(() => {
        setActive(-1);
        if (select && pData != null && pData.length > 0) {
            if (selectedValue != null) {
                pData.map((row, index) => {
                    if (row == selectedValue) {
                        selectLisener(row);
                        setActive(index);
                    }
                })
            } else {
                // selectLisener(pData[0]);
            }
        }
    }, [selectedValue, clearSelect]);


    const rowelemnt = (row, index) => {
        if (select) {
            return (

                <tr key={generateID()} onClick={() => { setActive(index); (selectLisener != null) && selectLisener(row); }} className={(index === acive) ? "table-primary" : ""}>
                    {columens(row, generateID, () => setActive(index))}
                </tr>
            );
        } else {
            return (
                <tr key={generateID()}>
                    {columens(row, generateID)}
                </tr>
            );
        }

    }

    return (
        <>
            {
                (pData != null && pData.length > 0) ?
                    <div>
                        <table className="table  table-striped table-bordered rtl text-center justify-content-center">
                            <thead>
                                <tr key={generateID()}>
                                    {titles.map((title) => <th key={generateID()} scope="col" className="text-center">{title}</th>)}
                                </tr>
                            </thead>
                            <tbody className="text-wrap" style={{ direction: "rtl" }}>
                                {pData.map((row, index) =>
                                    rowelemnt(row, index)
                                )}
                            </tbody>
                        </table>
                        <Pagination total={data.length} perPage={perPage} onPageChange={(page) => {
                            setCurrentPage(page);
                            pData = (paginate(data, currentPage, perPage));
                        }} currentPage={currentPage} />

                        {(loadSomething != null) ? loadSomething(clearSelect) : null}

                    </div >
                    : null
            }
        </>
    );

}
export default Table;
