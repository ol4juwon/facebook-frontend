import { Form, Formik } from 'formik'
import { useState } from 'react'
import RegisterInput from '../inputs/registerInput/register-input'
import DotLoader from "react-spinners/DotLoader";
import axios from "axios"
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import DoB from './DoB'
import Gender from './Gender'


export default function RegisterForm({ setVisible }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();     
    const userInformation = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthYear: new Date().getFullYear(),
        birthMonth: new Date().getMonth() + 1,
        birthDay: new Date().getDate(),
        gender: ""
    }
    const [user, setUser] = useState(userInformation);
    const { first_name, last_name, email, password, birthYear, birthMonth, birthDay, gender } = user;
    const temporaryYear = new Date().getFullYear();
    
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const years = Array.from(new Array(108), (val, index) => temporaryYear - index);
    const months = Array.from(new Array(12), (val, index) => 1 +  index);
    const getDays = () => {
        return new Date(birthYear, birthMonth, 0).getDate();
    }
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
    
        const registerValidation = Yup.object({
            first_name: Yup.string()
                .required("What's your First name?")
                .min(2, 'First name must be between 2 and 20 characters')
                .max(20, 'First name must be between 2 and 20 characters')
                .matches(/^[aA-zZ]+$/, 'numbers and special characters are not allowed'),

            last_name: Yup.string()
                .required("What's your surname?")
                .min(2, 'Surname must be between 2 and 20')
                .max(20, 'Surname must be between 2 and 20')
                .matches(/^[aA-zZ]+$/, 'numbers and special characters are not allowed'),

            email: Yup.string()
                .required("You will need this to login or reset your password")
                .email("Must be a valid email")
                .max(50),

            password: Yup.string()
                .required("Enter a combination of at least 6 numbers, letters and punctuation marks such as !@-_")
                .min(6, 'Minimuum of 6')
                .max(30, 'Maximum of 30 characters')
        });
        const [dateError, setDateError] = useState("");
        const [genderError, setGenderError] = useState("");

        const [error, setError] = useState("");
        const [success, setSuccess] = useState("");
        const [loading, setLoading] = useState(false);

        const registerSubmit = async () => {
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/register`,
                    {
                        first_name,
                        last_name,
                        email,
                        password,
                        birthYear,
                        birthMonth,
                        birthDay, 
                        gender,
                    }
                );
                setError("");
                setSuccess(data.message);
                const { message, ...rest} = data;
                setTimeout(() => {
                    dispatch({ type: "LOGIN", payload: rest });
                    Cookies.set("user", JSON.stringify(rest));
                    navigate("/");
                }, 2000)
            } catch (error) {
                setLoading(false)
                setSuccess("")
                setError(error.response.data.message)
            }
        }
    return (
        <div className='blur'>
            <div className='register'>
                <div className='register_header'>
                    <i className='exit_icon' onClick={() => setVisible(false)}></i>
                    <span>Sign Up</span>
                    <span>It's quick and easy</span>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        first_name,
                        last_name,
                        email,
                        password,
                        birthYear,
                        birthMonth,
                        birthDay,
                        gender
                    }}
                    validationSchema={registerValidation}
                    onSubmit={ () => {
                        let currentDate = new Date();
                        let selectedDate = new Date(birthYear, birthMonth - 1, birthMonth)
                        let atLeast14 = new Date(1970 + 14, 0, 1)
                        let atMost70 = new Date(1970 + 70, 0, 1)
                        if (currentDate - selectedDate < atLeast14 || currentDate - selectedDate >= atMost70) {
                            setDateError("Cannot sign up. You are either below 14 or above 70. ")
                        } else if(gender === "") {
                            setDateError("");
                            setGenderError("Please choose a gender.")
                        } else {
                            setDateError("");
                            setGenderError("");
                            registerSubmit();
                        }
                    }}
                >
                    {(formik) => 
                    <Form className='register_form'>
                        <div className='register_line'>
                            <RegisterInput
                                type="text"
                                placeholder="First name"
                                name="first_name"
                                onChange={handleRegisterChange}
                            />
                            <RegisterInput
                                type="text"
                                placeholder="Last name"
                                name="last_name"
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className='register_line'>
                            <RegisterInput
                                type="text"
                                placeholder="Mobile number or Email address"
                                name="email"
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className='register_line'>
                            <RegisterInput
                                type="password"
                                placeholder="New password"
                                name="password"
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className='register_col'>
                            <div className='register_line_header'>
                                Date of birth <i className='info_icon'></i> {" "}
                            </div>
                            <DoB 
                                birthDay={birthDay}
                                birthMonth={birthMonth}
                                birthYear={birthYear}
                                days={days}
                                months={months}
                                years={years}
                                handleRegisterChange={handleRegisterChange}
                                dateError={dateError}
                            />
                        </div>
                        <div className='register_column'>
                            <div className='register_line_header'>
                                Gender <i className='info_icon'></i> {" "}
                            </div>

                            <Gender 
                                handleRegisterChange={handleRegisterChange}
                                genderError={genderError}
                            />

                        </div>
                        <div className='register_information'>
                            By clicking Sign Up, you agree to our {" "}
                            <span>Terms, Data Policy &nbsp;</span> and
                            <span>Cookie Policy.</span> You may receive SMS notifications from us and can opt out any time.
                        </div>
                        <div className='register_button_wrapper'>
                            <button className='blue_btn open_signup'>Sign Up</button>
                        </div>
                        <DotLoader color= "#1876f2" loading={loading} size={30} />
                        {error && <div className='error_text'>{error}</div>}
                        {success && <div className='success_text'>{success}</div>}
                    </Form>
                }
                </Formik>
            </div>
        </div>
    );
}
