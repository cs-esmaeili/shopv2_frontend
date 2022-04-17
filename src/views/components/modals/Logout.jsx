import React from "react";
import { withRouter } from "react-router-dom";
import config from "../../../config.json";
import Modal from "../HOC/Modal";
import { setCookie } from '../../../global/cookie';

const Logout = ({ history, update = null }) => {

    const logOutHandler = async () => {
        await setCookie(-1, 'token', null);
        history.replace(config.web_url);
        if (update !== null) {
            update();
        }
    };

    const footer = () => {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={logOutHandler} style={{ margin: "5px" }}>خروج</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">لغو</button>
            </div>
        );
    }
    return (
        <Modal obj_id="Modal_Logout" close={false} footer={footer()} title="آماده هستید ؟">
            <div>
                اگر به طور کامل اطمینان دارید که میخواهید از جلسه فعلی
                خراج شوید دکمه خروج را بزنید
            </div>
        </Modal>

    );
};

export default withRouter(Logout);
