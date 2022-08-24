import React from "react";
import Modal from '../HOC/Modal';
import Product from './../Product';
import { toast } from 'react-toastify';
import { _changeFactorStatus } from "../../../services/Person";

const Factor = ({ data, onSubmit }) => {

    const changeStatus = async (factor_id, status) => {
        try {
            const respons = await _changeFactorStatus({ factor_id, status });
            if (respons.data.statusText === "ok") {
                toast(respons.data.message);
                onSubmit();
            }
        } catch (error) { }
    }
    return (
        <Modal obj_id="Modal_Factor" close={true} footer={null} title="" size="80%">
            <div>
                <div className="row m-2">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">خریدار</h6>
                            </div>
                            <div className="card-body" >

                                <div className="row m-2">
                                    <div className="col-6">
                                        <div className="card shadow">
                                            <div className="card-header">
                                                <h6 className="font-weight-bold text-primary">نام و نام خانوادگی</h6>
                                            </div>
                                            <div className="card-body" >
                                                {`${data.person.person_info.name} ${data.person.person_info.family}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="card shadow">
                                            <div className="card-header">
                                                <h6 className="font-weight-bold text-primary">تلفن همراه</h6>
                                            </div>
                                            <div className="card-body" >
                                                {data.person.person_info.phoneNumber}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">کالا های خریداری شده</h6>
                            </div>
                            <div className="card-body" >
                                <div className="row">
                                    {data != null && data.factor_products.map((value) => {
                                        return (
                                            <Product data={value.product} number={value.number} />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary">وضعیت سفارش</h6>
                            </div>
                            <div className="card-body" >
                                {console.log(data)}
                                <div className="row">
                                    <div className="col-3">
                                        <input type="radio" id="html" name="fav_language" value="HTML" checked={data.status == 4 ? true : false} onClick={() => {
                                            changeStatus(data.factor_id, 4);
                                        }} />
                                        <label for="html">تکمیل شده</label>
                                    </div>
                                    <div className="col-3">
                                        <input type="radio" id="html" name="fav_language" value="HTML" checked={data.status == 3 ? true : false} onClick={() => {
                                            changeStatus(data.factor_id, 3);
                                        }} />
                                        <label for="html">ارسال شده</label>
                                    </div>
                                    <div className="col-3">
                                        <input type="radio" id="html" name="fav_language" value="HTML" checked={data.status == 2 ? true : false} onClick={() => {
                                            changeStatus(data.factor_id, 2);
                                        }} />
                                        <label for="html">درحال آماده سازی</label>
                                    </div>
                                    <div className="col-3">
                                        <input type="radio" id="html" name="fav_language" value="HTML" checked={data.status == 1 ? true : false} onClick={() => {
                                            changeStatus(data.factor_id, 1);
                                        }} />
                                        <label for="html">پرداخت شده</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default Factor;
