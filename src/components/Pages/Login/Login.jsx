import React, { useEffect, useState } from "react";
import "../../../sass/login.scss";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/thunk";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);

    const emails = users.map((user) => user.email);
    const passwordValidate = users.find(
        (user) => user.email === form.email
    )?.password;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers());
        if (currentUser) {
            navigate("/");
        }
    }, [users.length]);

    const validateSchema = Yup.object().shape({
        email: Yup.string()
            .required("Vui lòng nhập email")
            .oneOf(emails, "Email chưa tồn tại!"),

        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .oneOf([passwordValidate], "Mật khẩu chưa chính xác!"),
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (values) => {
        currentUser = users.find((user) => user.email === values.email);

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
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
                    <h1>Login</h1>
                    <div>
                        <Field
                            name="email"
                            placeholder="Nhập email của bạn"
                            value={form.email || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                    />
                    <div>
                        <Field
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={form.password || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                    />
                    <button type="submit">Đăng nhập</button>

                    <section>
                        <p>
                            Bạn chưa có tài khoản?
                            <Link to="/register">Đăng ký ngay</Link>
                        </p>
                    </section>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
