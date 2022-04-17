import React, { Fragment, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

export const getValidator = new SimpleReactValidator({
    messages: {
        required: "پرکردن این فیلد الزامی میباشد",
        min: "کم تر از 5 کارکتر نباید باشد",
        max: "بیشتر از 255 کارکتر نباید باشد",
        accepted : "فایل انتخاب نشده است"
    },
    element: (message) => <div style={{ color: "red" }}>{message}</div>,
});

export const rules = (type) => {
    return ({
        'username' :"required|min:5|max:255" ,
        'password' : "required|min:5|max:255"
    }[type]);
};
