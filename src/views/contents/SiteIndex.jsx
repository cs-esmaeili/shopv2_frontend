import React, { useState, useEffect } from "react";
import Table from './../components/Table';
import { _addKey, _deleteKey } from './../../services/Key_Value';
import { toast } from 'react-toastify';
import { _sliderImages } from './../../services/IndexPage';
import { useSelector } from 'react-redux';


const SiteIndex = () => {

    const [sliderImages, setSliderImages] = useState(null);
    const permission = useSelector(state => state.profile.permissions).includes('siteindex_page');

    const getSliderImages = async () => {
        try {
            const respons = await _sliderImages();
            if (respons.data.statusText === "ok") {
                setSliderImages(respons.data.list);
            }
            toast(respons.data.message);
        } catch (error) { }
    }
  
    const addKey = async (key, value) => {
        try {
            const respons = await _addKey({ key, value });
            console.log(respons);
            if (respons.data.statusText === "ok") {
                getSliderImages();
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const deleteKey = async (key_value_id) => {
        try {
            const respons = await _deleteKey({ key_value_id });
            if (respons.data.statusText === "ok") {
                getSliderImages();
            }
            toast(respons.data.message);
        } catch (error) { }
    }

    useEffect(() => {
        getSliderImages();
    }, []);

    const columensSliderImages = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">
                    <i className="fa fa-trash" aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => deleteKey(row.key_value_id)}></i>
                </th>
                <th key={generateID()} scope="col" className="text-center">{JSON.parse(row.value).url}</th>
                {('url_target' in JSON.parse(row.value)) &&
                    <th key={generateID()} scope="col" className="text-center">{JSON.parse(row.value).url_target}</th>
                }
                {('description' in JSON.parse(row.value)) &&
                    <th key={generateID()} scope="col" className="text-center">{JSON.parse(row.value).description}</th>
                }
            </>
        );
    }
    if (permission === false) {
        return (
            <div class="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div>شما به این قسمت دسترسی ندارید</div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="row m-2">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">اسلایدر</h6>
                            </div>
                            <div className="card-body" >
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    addKey('indexPage', { location: 1, url: e.target.url.value, url_target: e.target.url_target.value });
                                    e.target.url.value = "";
                                    e.target.url_target.value = "";
                                }}>
                                    <input className="form-control mb-2" name="url" placeholder="لینک تصویر" />
                                    <input className="form-control mb-2" name="url_target" placeholder="لینک مقصد" />
                                    <button type="submit" className="btn btn-success" style={{ width: "100%" }}>ثبت</button>
                                </form>
                                <Table titles={[
                                    "عملیات",
                                    "url",
                                    "url_target",
                                ]} data={sliderImages} select={false} columens={columensSliderImages} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteIndex;
