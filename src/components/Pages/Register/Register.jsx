import React, { useEffect, useState } from "react";

import "../../../sass/login.scss";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUsers } from "../../../redux/thunk";
import { ImageIcon } from "../../../assets/icons/Icon";

const Register = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);

    const emails = users.map((user) => user.email);
    const nickNames = users.map((user) => user.nick_name);

    const [form, setForm] = useState({
        user_name: "",
        nick_name: "",
        email: "",
        password: "",
        confirm_password: "",
        user_img: "",
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
        if (currentUser) {
            navigate("/");
        }
    }, [users.length]);

    const validateSchema = Yup.object().shape({
        user_name: Yup.string()
            .required("Vui lòng nhập user name tối thiểu từ 3 đến 20 ký tự")
            .min(3, "Độ dài ký tự chưa hợp lệ")
            .max(20, "Độ dài ký tự chưa hợp lệ"),
        nick_name: Yup.string()
            .required("Vui lòng nhập nick name tối thiểu từ 3 đến 20 ký tự")
            .min(3, "Độ dài ký tự chưa hợp lệ")
            .max(20, "Độ dài ký tự chưa hợp lệ")
            .notOneOf(nickNames, "Nick name này đã tồn tại"),
        email: Yup.string()
            .required("Vui lòng nhập email")
            .email("Email chưa hợp lệ")
            .notOneOf(emails, "Tài khoản email này đã tồn tại!"),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu có độ dài từ 6 đến 20 ký tự")
            .min(6, "Độ dài ký tự chưa hợp lệ")
            .max(20, "Độ dài ký tự chưa hợp lệ"),
        confirm_password: Yup.string()
            .required("Vui lòng nhập lại mật khẩu")
            .oneOf([Yup.ref("password")], "Mật khẩu không hợp lệ"),
    });

    const handleChange = (e) => {
        const validImageTypes = [
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (e.target.type === "file") {
            if (validImageTypes.includes(e.target.files[0].type)) {
                const imgInput = e.target;
                const file = imgInput.files[0];

                if (file) {
                    const reader = new FileReader();

                    reader.addEventListener("load", () => {
                        setForm({
                            ...form,
                            user_img: reader.result,
                        });
                    });

                    reader.readAsDataURL(file);
                }
            } else {
                alert("You need to choose the image file!");
            }
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (values) => {
        const dateRegister = Date.now();

        const user = { ...values };

        delete user.password;
        delete user.confirm_password;

        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                ...user,
                background_url: "",
                date_register: dateRegister,
            })
        );

        dispatch(
            setUsers({
                ...values,
                date_register: dateRegister,
            })
        );
        navigate("/");
    };

    return (
        <div className="login-bg">
            <Formik
                initialValues={form}
                enableReinitialize
                validationSchema={validateSchema}
                onSubmit={handleSubmit}
            >
                <Form className="login-form">
                    <h1>Register</h1>
                    <div>
                        <Field
                            name="user_name"
                            placeholder="Nhập tên người dùng của bạn"
                            value={form.user_name}
                            onChange={handleChange}
                        />
                    </div>
                    <ErrorMessage
                        name="user_name"
                        component="section"
                        className="error"
                    />

                    <div>
                        <Field
                            name="nick_name"
                            placeholder="Nhập nick name"
                            value={form.nick_name}
                            onChange={handleChange}
                        />
                    </div>
                    <ErrorMessage
                        name="nick_name"
                        component="section"
                        className="error"
                    />

                    <div>
                        <Field
                            name="email"
                            placeholder="Nhập email của bạn"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <ErrorMessage
                        name="email"
                        component="section"
                        className="error"
                    />

                    <div>
                        <Field
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <ErrorMessage
                        name="password"
                        component="section"
                        className="error"
                    />

                    <div>
                        <Field
                            name="confirm_password"
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            value={form.confirm_password}
                            onChange={handleChange}
                        />
                    </div>
                    <ErrorMessage
                        name="confirm_password"
                        component="section"
                        className="error"
                    />

                    <div>
                        <Field
                            id="img"
                            name="img_url"
                            type="file"
                            onChange={handleChange}
                        />
                        <label htmlFor="img" className="choose-img">
                            <div className="img-icon-login">
                                <ImageIcon width={24} height={24} />
                            </div>
                            <span>Chọn Ảnh (không bắt buộc)</span>
                        </label>
                    </div>

                    <button type="submit">Đăng ký</button>
                    <section>
                        <p>
                            Bạn đã có tài khoản?
                            <Link to="/login">Đăng nhập ngay</Link>
                        </p>
                    </section>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
