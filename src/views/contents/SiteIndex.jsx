import React, { useState, useEffect } from "react";
import Table from './../components/Table';
import { _addKey, _deleteKey } from './../../services/Key_Value';
import { toast } from 'react-toastify';
import { _sliderImages, _popularPosts, _lastVideo, _top3Recent, _latestScreenshots, _latestPictures } from './../../services/IndexPage';
import { useSelector } from 'react-redux';


const SiteIndex = () => {

    const [sliderImages, setSliderImages] = useState(null);
    const [popularPosts, setPopularPosts] = useState(null);
    const [lastVideo, setLastVideo] = useState(null);
    const [top3Recent, setTop3Recent] = useState(null);
    const [latestScreenshots, setLatestScreenshots] = useState(null);
    const [latestPictures, setLatestPictures] = useState(null);
    const permission = useSelector(state => state.profile.permissions).includes('siteindex_page');

    const getLatestPictures = async () => {
        try {
            const respons = await _latestPictures();
            if (respons.data.statusText === "ok") {
                setLatestPictures(respons.data.list);
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const getLatestScreenshots = async () => {
        try {
            const respons = await _latestScreenshots();
            if (respons.data.statusText === "ok") {
                setLatestScreenshots(respons.data.list);
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const getTop3Recent = async () => {
        try {
            const respons = await _top3Recent();
            if (respons.data.statusText === "ok") {
                setTop3Recent(respons.data.list);
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const getSliderImages = async () => {
        try {
            const respons = await _sliderImages();
            if (respons.data.statusText === "ok") {
                setSliderImages(respons.data.list);
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const getLastVideo = async () => {
        try {
            const respons = await _lastVideo();
            if (respons.data.statusText === "ok") {
                setLastVideo(respons.data.list);
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const getPopularPosts = async () => {
        try {
            const respons = await _popularPosts();
            if (respons.data.statusText === "ok") {
                setPopularPosts(respons.data.list);
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
                getPopularPosts();
                getLastVideo();
                getTop3Recent();
                getLatestScreenshots();
                getLatestPictures();
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const deleteKey = async (key_value_id) => {
        try {
            const respons = await _deleteKey({ key_value_id });
            if (respons.data.statusText === "ok") {
                getSliderImages();
                getPopularPosts();
                getLastVideo();
                getTop3Recent();
                getLatestScreenshots();
                getLatestPictures();
            }
            toast(respons.data.message);
        } catch (error) { }
    }

    useEffect(() => {
        getSliderImages();
        getPopularPosts();
        getLastVideo();
        getTop3Recent();
        getLatestScreenshots();
        getLatestPictures();
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
    const columensPopularPosts = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">
                    <i className="fa fa-trash" aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => deleteKey(row.key_value_id)}></i>
                </th>
                <th key={generateID()} scope="col" className="text-center">{JSON.parse(row.value).post_id}</th>
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
                    <div className="col-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">مطالب پر بازدید</h6>
                            </div>
                            <div className="card-body" >
                                <input className="form-control mb-2" placeholder="پست ID" onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addKey('indexPage', { location: 2, post_id: e.target.value });
                                        e.target.value = "";
                                    }
                                }} />
                                <Table titles={[
                                    "عملیات",
                                    "post_id",
                                ]} data={popularPosts} select={false} columens={columensPopularPosts} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
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
                <div className="row m-2">
                    <div className="col-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">آخرین ویدیو</h6>
                            </div>
                            <div className="card-body" >
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    addKey('indexPage', { location: 3, url: e.target.url.value, url_target: e.target.url_target.value });
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
                                ]} data={lastVideo} select={false} columens={columensSliderImages} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">مطالب پیشنهادی</h6>
                            </div>
                            <div className="card-body" >
                                <input className="form-control mb-2" placeholder="پست ID" onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addKey('indexPage', { location: 4, post_id: e.target.value });
                                        e.target.value = "";
                                    }
                                }} />
                                <Table titles={[
                                    "عملیات",
                                    "post_id",
                                ]} data={top3Recent} select={false} columens={columensPopularPosts} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">اخرین اسکرین شات ها</h6>
                            </div>
                            <div className="card-body" >
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    addKey('indexPage', { location: 5, url: e.target.url.value, description: e.target.description.value });
                                    e.target.url.value = "";
                                    e.target.description.value = "";
                                }}>
                                    <input className="form-control mb-2" name="url" placeholder="لینک تصویر" />
                                    <input className="form-control mb-2" name="description" placeholder="توضیحات" style={{ textAlign: "right", direction: "rtl" }} />
                                    <button type="submit" className="btn btn-success" style={{ width: "100%" }}>ثبت</button>
                                </form>
                                <Table titles={[
                                    "عملیات",
                                    "url",
                                    "description",
                                ]} data={latestScreenshots} select={false} columens={columensSliderImages} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">آخرین تصاویر</h6>
                            </div>
                            <div className="card-body" >
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    addKey('indexPage', { location: 6, url: e.target.url.value, description: e.target.description.value });
                                    e.target.url.value = "";
                                    e.target.description.value = "";
                                }}>
                                    <input className="form-control mb-2" name="url" placeholder="لینک تصویر" />
                                    <input className="form-control mb-2" name="description" placeholder="توضیحات" style={{ textAlign: "right", direction: "rtl" }} />
                                    <button type="submit" className="btn btn-success" style={{ width: "100%" }}>ثبت</button>
                                </form>
                                <Table titles={[
                                    "عملیات",
                                    "url",
                                    "description",
                                ]} data={latestPictures} select={false} columens={columensSliderImages} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteIndex;
