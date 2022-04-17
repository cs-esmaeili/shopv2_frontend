import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { _createPost, _updatePost } from './../../services/Post';
import { toast } from 'react-toastify';
import { _categoryListPure } from "../../services/Category";
import useGenerator from "../../global/Idgenerator";
import { useSelector } from 'react-redux';

const CreatePost = ({ edit = false, data = null, onSubmit = null }) => {

    const editor = useRef(null)
    const [category_id, setCategory_id] = useState((edit) ? data.category_id : null);
    const [categoryPure, setCategoryPure] = useState(null);
    const [image, setImage] = useState((edit) ? data.image : '');
    const [title, setTitle] = useState((edit) ? data.title : '');
    const [description, setDescription] = useState((edit) ? data.description : '');
    const [meta_keywords, setMeta_keywords] = useState((edit) ? data.meta_keywords : '');
    const [generateID] = useGenerator();
    const permission = useSelector(state => state.profile.permissions).includes('createPost_page');

    const getCtegorysPure = async () => {
        try {
            const respons = await _categoryListPure();
            if (respons.data.statusText === "ok") {
                setCategoryPure(respons.data.list);
                setCategory_id(respons.data.list[0].category_id);
            }
        } catch (error) { }
    }
    const createPost = async (status) => {
        try {
            const obj = {
                post_id: (edit ? data.post_id : ''),
                category_id,
                image,
                title,
                body: editor.current.value,
                description,
                meta_keywords,
                status
            };
            let respons = null;
            if (edit) {
                respons = await _updatePost(obj);
            } else {
                respons = await _createPost(obj);
            }
            if (respons.data.statusText === "ok") {
                if (edit) {
                    onSubmit();
                    document.getElementById('Modal_EditPost_open').click();
                } else {
                    editor.current.value = null;
                    setCategory_id(categoryPure[0].category_id);
                    setImage("");
                    setTitle("");
                    setDescription("");
                    setMeta_keywords("");
                }
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    useEffect(() => {
        getCtegorysPure();
        if (edit) {
            setCategory_id((edit) ? data.category_id : null);
            setCategoryPure(null);
            setImage((edit) ? data.image : '');
            setTitle((edit) ? data.title : '');
            setDescription((edit) ? data.description : '');
            setMeta_keywords((edit) ? data.meta_keywords : '');
        }
    }, [data]);

    if (permission === false) {
        return (
            <div class="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div>شما به این قسمت دسترسی ندارید</div>
            </div>
        );
    } else {
        return (
            <>
                <form onSubmit={createPost}>
                    <div className="row m-2">
                        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mb-2">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h6 className="font-weight-bold text-primary">دسته بندی</h6>
                                </div>
                                <div className="card-body" >
                                    {categoryPure != null && categoryPure.length > 0 ?
                                        <select value={category_id} className="form-control justify-content-center" style={{ direction: "rtl" }} onChange={(e) => setCategory_id(e.target.value)}>
                                            {categoryPure.map(element => <option key={generateID()} value={element.category_id}>{element.name}</option>)}
                                        </select>
                                        :
                                        <span>
                                            ابتدا در بخش دسته بندی دسته بندی ایجاد کنید
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12  mb-2">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h6 className="font-weight-bold text-primary">عکس ID</h6>
                                </div>
                                <div className="card-body" >
                                    <input className="form-control" style={{ textAlign: "right" }} value={image} onChange={(e) => setImage(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12  mb-2">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h6 className="font-weight-bold text-primary">عنوان</h6>
                                </div>
                                <div className="card-body" >
                                    <input className="form-control" style={{ textAlign: "right", direction: "rtl" }} value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-12">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h6 className="font-weight-bold text-primary">توضیحات</h6>
                                </div>
                                <div className="card-body" >
                                    <input className="form-control" style={{ textAlign: "right", direction: "rtl" }} value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-12">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h6 className="font-weight-bold text-primary">کلمات کلیدی</h6>
                                </div>
                                <div className="card-body" >
                                    <input className="form-control" style={{ textAlign: "right", direction: "rtl" }} value={meta_keywords} onChange={(e) => setMeta_keywords(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-12">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h6 className="font-weight-bold text-primary">مطلب</h6>
                                </div>
                                <div className="card-body" >
                                    <JoditEditor
                                        ref={editor}
                                        value={edit ? data.body : ""}
                                        config={{
                                            readonly: false
                                        }}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newContent => { }} // preferred to use only this option to update the content for performance reasons
                                        onChange={newContent => { }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 justify-content-center">
                        {(edit === false) &&
                            <>
                                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12  mb-2">
                                    <div className="card shadow">
                                        <div className="card-header">
                                        </div>
                                        <div className="card-body" >
                                            <button type="button" className="btn btn-danger" style={{ width: "100%" }}>حذف</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12  mb-2" >
                                    <div className="card shadow">
                                        <div className="card-header">
                                        </div>
                                        <div className="card-body" >
                                            <button type="button" className="btn btn-warning" disabled style={{ width: "100%" }} onClick={() => createPost(1)}>ثبت و انشار</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12  mb-2">
                            <div className="card shadow">
                                <div className="card-header">
                                </div>
                                <div className="card-body" >
                                    <button type="button" className="btn btn-success" style={{ width: "100%" }} onClick={() => createPost(0)}>ثبت</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default CreatePost;
