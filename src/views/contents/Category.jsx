import { useState, useEffect } from "react";
import { _addCategory, _deleteCategory, _categoryListPyramid, _categoryListPure } from './../../services/Category';
import useGenerator from "../../global/Idgenerator";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Category = () => {


    const [categoryPyramid, setCategoryPyramid] = useState(null);
    const [categoryPure, setCategoryPure] = useState(null);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [file_id, setFile_id] = useState('');
    const [parent_id, setParent_id] = useState(0);
    const permission = useSelector(state => state.profile.permissions).includes('category_page');
    const [generateID] = useGenerator();

    const getCtegorysPyramid = async () => {
        try {
            const respons = await _categoryListPyramid();
            if (respons.data.statusText === "ok") {
                setCategoryPyramid(respons.data.list);
            }
        } catch (error) { }
    }
    const getCtegorysPure = async () => {
        try {
            const respons = await _categoryListPure();
            if (respons.data.statusText === "ok") {
                setCategoryPure(respons.data.list);
            }
        } catch (error) { }
    }
    const elements = (array) => {
        let outPut = [];
        let checker = () => array.every(v => Array.isArray(v));
        for (let index = 0; index < array.length; index++) {
            let items = [];
            if (Array.isArray(array[index])) {
                let result = (
                    (array === categoryPyramid)
                        ?
                        <div key={generateID()} className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                            <ul key={generateID()} className="list-group">
                                {elements(array[index])}
                            </ul>
                        </div>
                        :
                        (checker() === true) ?
                            <ul key={generateID()} className="list-group m-1">
                                {elements(array[index])}
                            </ul>
                            :
                            <li key={generateID()} className="list-group-item">
                                <ul key={generateID()} className="list-group m-1">
                                    {elements(array[index])}
                                </ul>
                            </li>
                );
                items = [...items, result];
            } else {
                let element = <li key={generateID()} className="list-group-item d-flex justify-content-between">
                    <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteCategory(array[index].category_id)}></i>
                    {array[index].name}
                </li >;
                items = [...items, element];
            }
            outPut = [...outPut, items];
        }
        return outPut;
    }
    const addCategory = async (event) => {
        event.preventDefault();

        try {
            const data = {
                name,
                type,
                file_id,
                parent_id
            };
            const respons = await _addCategory(data);
            if (respons.data.statusText === "ok") {
                setName("");
                setType("");
                setFile_id("");
                getCtegorysPyramid();
                getCtegorysPure();
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const deleteCategory = async (category_id) => {
        try {
            const data = {
                category_id,
            };
            const respons = await _deleteCategory(data);
            if (respons.data.statusText === "ok") {
                getCtegorysPyramid();
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const selectOptions = () => {
        return (
            <>
                <option key={generateID() + ""} value="0">مجموعه جدید</option>
                {
                    categoryPure != null &&
                    categoryPure.map(element => <option key={generateID() + ""} value={element.category_id}>{element.name}</option>)
                }
            </>
        )
    }

    useEffect(() => {
        getCtegorysPyramid();
        getCtegorysPure();
    }, []);
    if (permission === false) {
        return (
            <div class="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div>شما به این قسمت دسترسی ندارید</div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="row m-2 justify-content-end">
                    {categoryPyramid != null && elements(categoryPyramid)}
                </div>
                <form className="m-2" onSubmit={addCategory}>
                    <div className="card shadow">
                        <div className="card-header">
                            <h6 className="font-weight-bold text-primary">ساخت دسته بندی</h6>
                        </div>
                        <div className="card-body" >
                            <div className="row" >
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="fileId">ای دی فایل</label>
                                        <input className="form-control" id="fileId" style={{ textAlign: "right" }} value={file_id} onChange={(e) => setFile_id(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="categoryName">نام دسته بندی</label>
                                        <input className="form-control" id="categoryName" style={{ textAlign: "right" }} value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="categoryType">نوع دسته بندی</label>
                                        <input className="form-control" id="categoryType" style={{ textAlign: "right" }} value={type} onChange={(e) => setType(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="parentSelect">مجموعه مورد نظر</label>
                                        <select value={parent_id} className="form-control" id="parentSelect" style={{ direction: "rtl" }} onChange={(e) => setParent_id(e.target.value)}>
                                            <option value="0">مجموعه جدید</option>
                                            {categoryPure != null && categoryPure.map(element => <option value={element.category_id} key={generateID()}>{element.name}</option>)}
                                        </select>

                                    </div>
                                </div>
                                <div className="col-12 m-2" style={{ textAlign: "center" }}>
                                    <button type="submit" className="btn btn-success">ساخت دسته بندی</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        );
    }
}
export default Category;
