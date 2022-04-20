import { useState, useEffect } from 'react';
import useGenerator from "../../global/Idgenerator";
import { _categoryListPure } from "../../services/Category";
import { Formik, Form, Field, FieldArray } from 'formik';
import { createProductSchema } from '../../global/validator_Schemas';
import SelectFolder from './../components/modals/SelectFolder';
import { toast } from 'react-toastify';
import { _CreateProduct } from './../../services/Product';
import { _publicFolderFilesLinks } from '../../services/FileManager';

const CreateProduct = ({ edit = false, data = null, onSubmit = null }) => {

    const [images, setImages] = useState(null);
    const [categoryPure, setCategoryPure] = useState(null);
    const [category_id, setCategory_id] = useState((edit) ? data.category_id : -1);
    const [status, setStatus] = useState((edit) ? data.status : 0);
    const [generateID] = useGenerator();

    const getCtegorysPure = async () => {
        try {
            const respons = await _categoryListPure();
            if (respons.data.statusText === "ok") {
                setCategoryPure(respons.data.list);
                if (edit) {
                    setCategory_id(data.category_id);
                } else {
                    setCategory_id(respons.data.list[0].category_id);
                }
            }
        } catch (error) { }
    }

    const handelSubmit = async (values, reset) => {
        const obj = {
            category_id: category_id,
            name: values.productName,
            price: values.productPrice,
            sale_price: values.productSalePrice,
            status: status,
            stock: values.stock,
            description: values.description,
            image_folder: images.foler_path,
            review: values.review,
            items: values.items,
            product_id: -1,
        }
        if (edit) {
            if (images.foler_path === undefined) {
                delete obj.image_folder;
            }
            obj.product_id = data.product_id;
        }

        try {
            const respons = await _CreateProduct(obj);
            if (respons.data.statusText === "ok") {
                reset();
                setImages(null);
                setStatus(0);
            }
            toast(respons.data.message);
            if (edit) {
                document.getElementById('Modal_EditProduct_open').click();
                onSubmit();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const publicFolderFiles = async (path) => {
        try {
            const data = {
                path,
            };
            const respons = await _publicFolderFilesLinks(data);
            if (respons.data.statusText === "ok") {
                setImages(respons.data.list);
            } else {
                toast(respons.data.message);
            }
        } catch (error) { }
    }


    useEffect(() => {
        getCtegorysPure();
        if (edit) {
            setCategory_id((edit) ? data.category_id : null);
            setCategoryPure(null);
            publicFolderFiles(data.image_folder);
            setStatus(data.status);
        }
    }, [data]);



    return (
        <div className='container-fluid'>
            <SelectFolder data={(data) => {
                setImages(data);
            }} />
            <Formik
                initialValues={{
                    productName: (edit) ? data.name : '',
                    productPrice: (edit) ? data.price : '',
                    productSalePrice: (edit) ? data.sale_price : '',
                    stock: (edit) ? data.stock : '',
                    description: (edit) ? data.description : '',
                    file: (edit) ? true : false,
                    category_id: (edit) ? true : false,
                    review: (edit) ? data.review : '',
                    items: (edit) ? data.items : [],
                }}
                enableReinitialize={true}
                validationSchema={createProductSchema}
                onSubmit={(values, { resetForm }) => {
                    handelSubmit(values, resetForm);
                }}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <div className="row">
                            <div className='col'>
                                <div className="card shadow">
                                    <div className="card-header">
                                        <h6 className="font-weight-bold text-primary">تصاویر کالا</h6>
                                    </div>
                                    <div className="card-body" >
                                        <div className='row' style={{ display: "flex", flexDirection: "row-reverse" }}>
                                            {images != null && images.hasOwnProperty('files') && Array.isArray(images.files) && images.files.map((value, index) => {
                                                return (
                                                    <div className='col-xxl-1 col-xl-2 col-lg-4 col-md-5 col-sm-6 col-xs-6' >
                                                        <label htmlFor={`file-upload-${index}`} className="custom-file-upload" style={{
                                                            alignItems: "center", justifyContent: "center"
                                                        }}>
                                                            <img className="img-fluid" src={value.link} alt="preview" onLoad={() => {
                                                                setFieldValue("file", true);
                                                            }} />
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                            {edit && images != null && Array.isArray(images) && images.map((value, index) => {
                                                return (
                                                    <div className='col-xxl-1 col-xl-2 col-lg-4 col-md-5 col-sm-6 col-xs-6' >
                                                        <label htmlFor={`file-upload-${index}`} className="custom-file-upload" style={{
                                                            alignItems: "center", justifyContent: "center"
                                                        }}>
                                                            <img className="img-fluid" src={value.link} alt="preview" onLoad={() => {
                                                                setFieldValue("file", true);
                                                            }} />
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                            <div className='col-xxl-1 col-xl-2 col-lg-4 col-md-5 col-sm-6 col-xs-6'>
                                                <label htmlFor="file-upload-new" style={{
                                                    display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"
                                                }} onClick={(e) => {
                                                    document.getElementById('Modal_FileManager_Folder_open').click();
                                                }}>
                                                    <i className="fa fa-plus" aria-hidden="true" style={{ textAlign: "center", fontSize: "100px" }}></i>
                                                </label>
                                            </div>

                                        </div>
                                        {errors.file && touched.file ? (
                                            <div style={{ color: "red" }}>{errors.file}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className='col'>
                                <div className="card shadow">
                                    <div className="card-header">
                                        <h6 className="font-weight-bold text-primary">اطلاعات کالا</h6>
                                    </div>
                                    <div className="card-body" >
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">دسته بندی</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        {(categoryPure != null && categoryPure.length > 0) ?
                                                            <>
                                                                {(values.category_id === false) && setFieldValue("category_id", true)}
                                                                <select value={category_id} className="form-control justify-content-center" style={{ direction: "rtl" }}
                                                                    onChange={(e) => {
                                                                        setCategory_id(e.target.value);
                                                                        setFieldValue("category_id", true);
                                                                    }}>
                                                                    {categoryPure.map(element => <option key={generateID()} value={element.category_id}>{element.name}</option>)}
                                                                </select>
                                                            </>
                                                            :
                                                            <div>
                                                                <span>
                                                                    ابتدا در بخش دسته بندی دسته بندی ایجاد کنید
                                                                </span>
                                                            </div>
                                                        }
                                                        {errors.category_id && touched.category_id ? (
                                                            <div style={{ color: "red" }}>{errors.category_id}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">نام کالا</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        <div className="form-group">
                                                            {console.log()}
                                                            <Field className="form-control form-control-user" name="productName" placeholder="نام کالا" style={{ textAlign: "right", direction: "rtl" }} />
                                                            {errors.productName && touched.productName ? (
                                                                <div style={{ color: "red" }}>{errors.productName}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-6'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">قیمت کالا / تومان</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        <div className="form-group">
                                                            <Field className="form-control form-control-user" name="productPrice" placeholder="قیمت کالا" style={{ textAlign: "left" }} />
                                                            {errors.productPrice && touched.productPrice ? (
                                                                <div style={{ color: "red" }}>{errors.productPrice}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='col-6'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">قیمت فروش کالا / تومان</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        <div className="form-group">
                                                            <Field className="form-control form-control-user" name="productSalePrice" placeholder="قیمت فروش کالا" style={{ textAlign: "left" }} />
                                                            {errors.productSalePrice && touched.productSalePrice ? (
                                                                <div style={{ color: "red" }}>{errors.productSalePrice}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-6'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">وضعیت کالا</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        {/* {console.log(status)} */}
                                                        <select value={status} style={{ textAlign: "right" }} className="form-control justify-content-center"
                                                            onChange={(e) => setStatus(e.target.value)}>
                                                            <option key={generateID()} value={0}>فروش</option>
                                                            <option key={generateID()} value={1}>نا موجود</option>
                                                            <option key={generateID()} value={2}>غیر فعال</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">موجودی انبار</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        <div className="form-group">
                                                            <Field className="form-control form-control-user" name="stock" placeholder="موجودی انبار" style={{ textAlign: "left" }} />
                                                            {errors.stock && touched.stock ? (
                                                                <div style={{ color: "red" }}>{errors.stock}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-12'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">نقد و برسی کالا</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        <div className="form-group">
                                                            <Field className="form-control form-control-user" name="review" placeholder="نقد و برسی کالا" style={{ textAlign: "right", direction: "rtl" }} />
                                                            {errors.review && touched.review ? (
                                                                <div style={{ color: "red" }}>{errors.review}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <FieldArray
                                            name="items"
                                            render={arrayHelpers => (
                                                <div className='mt-2' style={{ display: 'flex', flexDirection: "row-reverse", flexWrap: 'wrap' }}>
                                                    {values.items && values.items.length > 0 && (
                                                        values.items.map((item, index) => (
                                                            <div className='col-3 mb-2'>
                                                                <div className="card shadow">
                                                                    <div className="card-header">
                                                                        <h6 className="font-weight-bold text-primary">مشخصات کالا</h6>
                                                                    </div>
                                                                    <div className="card-body" >
                                                                        <div className="form-group">
                                                                            <div className='row'>
                                                                                <div className='col'>
                                                                                    <Field className="form-control form-control-user" name="key" value={item.value}
                                                                                        placeholder="مقدار" style={{ textAlign: "center", direction: "rtl" }}
                                                                                        onChange={(e) => {
                                                                                            let newItem = item;
                                                                                            newItem.value = e.target.value;
                                                                                            arrayHelpers.replace(index, newItem);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className='col'>
                                                                                    <Field className="form-control form-control-user" name="value" value={item.key}
                                                                                        placeholder="مشخصه" style={{ textAlign: "center", direction: "rtl" }}
                                                                                        onChange={(e) => {
                                                                                            let newItem = item;
                                                                                            newItem.key = e.target.value;
                                                                                            arrayHelpers.replace(index, newItem);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn btn-danger" style={{ width: "100%" }} onClick={() => arrayHelpers.remove(index)}>حذف</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                    <div className='col-3 mb-2'>
                                                        <label style={{
                                                            display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"
                                                        }} onClick={() => arrayHelpers.push({ key: "", value: "" , item_id : -1 })}>
                                                            <i className="fa fa-plus" aria-hidden="true" style={{ textAlign: "center", fontSize: "100px" }}></i>
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        {errors.items && touched.items ? (
                                            <div style={{ color: "red" }}>{errors.items}</div>
                                        ) : null}
                                        <div className='row mt-2'>
                                            <div className='col-12'>
                                                <div className="card shadow">
                                                    <div className="card-header">
                                                        <h6 className="font-weight-bold text-primary">توضیحات کالا</h6>
                                                    </div>
                                                    <div className="card-body" >
                                                        <div className="form-group">
                                                            <Field className="form-control form-control-user" name="description" placeholder="توضیحات کالا" style={{ textAlign: "right", direction: "rtl" }} />
                                                            {errors.description && touched.description ? (
                                                                <div style={{ color: "red" }}>{errors.description}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-12'>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    ثبت کالا
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default CreateProduct;
