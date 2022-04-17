import * as Yup from 'yup';

const messages = (item, value = null) => {
    const temp = {
        min: `کم تر از ${value} کارکتر نباید باشد`,
        max: `بیشتر از ${value} کارکتر نباید باشد`,
        required: "پرکردن این فیلد الزامی میباشد",
        accepted: "فایل انتخاب نشده است",
        email: "فرمت وارد شده ایمیل نمی باشد",
        moreThan: `مقدار این فیلد باید بیشتر از فیلد ${value} باشد`,
        imageRequired: 'باید تصویری انتخاب شود',
        selectRequired: 'باید یکی از گزینه ها انتخاب شود'
    }
    return temp[item];
}

export const LogInSchema = Yup.object().shape({
    username: Yup.string()
        .email(messages('email'))
        .min(4, messages('min', 4))
        .max(255, messages('max', 255))
        .required(messages('required')),
    password: Yup.string()
        .min(4, messages('min', 4))
        .max(255, messages('max', 255))
        .required(messages('required')),
});

export const createProductSchema = Yup.object().shape({
    productName: Yup.string()
        .min(2, messages('min', 2))
        .max(255, messages('max', 255))
        .required(messages('required')),
    productPrice: Yup.number()
        .positive()
        .min(2, messages('min', 2))
        .max(999999999999, messages('max', 12))
        .required(messages('required'))
        .moreThan(Yup.ref("productSalePrice"), messages('moreThan', 'قیمت فروش کالا')),
    productSalePrice: Yup.number()
        .positive()
        .min(2, messages('min', 2))
        .max(999999999999, messages('max', 12))
        .required(messages('required')),
    stock: Yup.number()
        .positive()
        .min(1, messages('min', 1))
        .required(messages('required')),
    file: Yup.boolean().oneOf([true], messages('imageRequired')),
    category_id: Yup.boolean().oneOf([true], messages('selectRequired')),

});
