import {NextPage} from "next";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "../../components/Layouts/Auth";
import {useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginValidation} from "../../validations";
import {LOGIN_USER, SOCIAL_AUTH} from "../../graphql/mutations";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {useUser} from "../../utils/store";
import axios from "axios";
import {setCookie} from "cookies-next";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import LoginHook from "../../hooks/GoogleLogin"
import {useGoogleLogin} from "@react-oauth/google";

export interface UserSubmitForm {
    email: string;
    password: string;

}

const Login: NextPage = () => {
    const [loginUser, {loading}] = useMutation(LOGIN_USER)
    const [loginSocially, {loading: socialLoginLoading}] = useMutation(SOCIAL_AUTH)
    const router = useRouter()
    const {StoreUserDetails} = useUser()

    let {redirect} = router.query

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(loginValidation)
    });

    const handleCredentials = (data: any) => {
        let {user, access_token} = data;

        if (window) {
            localStorage.setItem('etr_token', access_token)
        }
        setCookie('etr_token', access_token)
        StoreUserDetails && StoreUserDetails(user, access_token)
        toast.success("Authentication successful")
        if (redirect) {
            // router.push('/account/setup')
            window.location.href = "/account/setup"
        } else {
            let { accountType } = data
            if (!accountType) {
                window.location.href = '/account/setup'
            }
            else {
                if(accountType?.name === 'LANDLORD')
                    window.location.href = "/account/dashboard"
                else
                    window.location.href = "/account/dashboard/tenant"
            }
        }
    }

    const onSubmit = async (data: UserSubmitForm) => {
        // axios.defaults.withCredentials = true;
        // await axios.get('http://localhost:8001/sanctum/csrf-cookie').then((resolve) => {
        //     axios.post('http://localhost:8001/api/login', {
        //         email: data.email,
        //        password: data.password,
        //     }).then(({data}) => {
        //         console.log(data)
        //     })
        // })
        await loginUser({
            variables: {
                input: {
                    username: data.email,
                    password: data.password,
                }

            }
        }).then(({data}) => {
            if (data?.login) {
                handleCredentials(data?.login)
            }
        }).catch(error => toast.error(error.message));

    };

    const signInWithFaceBook = async () => {
        // @ts-ignore
        if (window && window.FB) {
            // @ts-ignore
            await window.FB.getLoginStatus(async (response: any) =>
            {
                if (response && response.status == 'connected')
                {
                    let
                        {
                            authResponse
                        } = response
                    let
                        {
                            accessToken
                        } = authResponse

                    loginSocially({
                        variables: {
                            accessToken,
                            provider: "facebook"
                        }
                    }).then(({data}) => {
                        if (data?.socialLogin) {
                            handleCredentials(data?.socialLogin)
                        }
                    }).catch(error => toast.error(error.message));
                }
                else
                {
                    // @ts-ignore
                    await window.FB.login(async (response: any) =>
                    {
                        var userInfo = {
                            loginType: 'fb',
                            fb: response,
                        }
                        let
                            {
                                authResponse
                            } = response
                        if (authResponse)
                        {
                            let
                                {
                                    accessToken
                                } = authResponse
                            loginSocially({
                                variables: {
                                    accessToken,
                                    provider: "facebook"
                                }
                            }).then(({data}) => {
                                if (data?.socialLogin) {
                                    handleCredentials(data?.socialLogin)
                                }
                            }).catch(error => toast.error(error.message));
                        }

                    }, {scope: 'public_profile,email'})
                }
            })
        }
    }

    const signInWithGoogle = async (response: any) => {
        console.log(response)
        await loginSocially({
            variables: {
                accessToken: response.access_token,
                provider: "google"
            }
        }).then(({data}) => {
            if (data?.socialLogin) {
                handleCredentials(data?.socialLogin)
            }
        }).catch(error => toast.error(error.me))
    }

    const googleLogin = useGoogleLogin({
        // clientId: "365499363814-27cd94bbo04h8kia0hf4c5h1jnq3ma81.apps.googleusercontent.com",
        onSuccess: response =>  signInWithGoogle(response),
    });

    // @ts-ignore
    return (
        <AuthLayout>
            <div className={'w-full flex justify-between items-start'}>
                {/*<div className={'py-12 flex items-center'}>*/}
                <div className={'w-full md:w-1/2 flex justify-center items-center'}>
                    <div className={'w-full md:w-8/12 text-center'}>
                        <h1 className={'text-2xl mb-4'}>Welcome Back!</h1>
                        <p className={'text-sm mb-4'}>
                            Enter your Login ID
                        </p>
                        {/* Signup Form Area */}
                        {/* <div className={'bg-orange-500 rounded-md-md px-4 py-2 text-center text-xs text-white my-4'}>
                            The password you enter is incorrect. Please try again
                        </div> */}

                        {/*<GoogleLogin*/}
                        {/*    clientId={'365499363814-27cd94bbo04h8kia0hf4c5h1jnq3ma81.apps.googleusercontent.com'}*/}
                        {/*    buttonText="Log in with Google"*/}
                        {/*    scope={"email"}*/}
                        {/*    render={props => (*/}
                        {/*        <button onClick={props.onClick} disabled={props.disabled} className={'w-full p-2 rounded-md flex items-center bg-google mb-2'}>*/}
                        {/*            <Image src={'/images/google.png'} alt={'Google Image'} width={30} height={30}/>*/}
                        {/*            <div className={'w-3/4 text-center text-sm text-white'}>*/}
                        {/*                Continue With Google*/}
                        {/*            </div>*/}
                        {/*        </button>*/}
                        {/*    )}*/}
                        {/*    onSuccess={signInWithGoogle}*/}
                        {/*    onFailure={signInWithGoogle}*/}
                        {/*    cookiePolicy={'single_host_origin'}*/}
                        {/*/>*/}
                        <button onClick={() => googleLogin()} className={'w-full p-2 rounded-md flex items-center bg-google mb-2'}>
                            <Image src={'/images/google.png'} alt={'Google Image'} width={30} height={30}/>
                            <div className={'w-3/4 text-center text-sm text-white'}>
                                Continue With Google
                            </div>
                        </button>
                        <button onClick={signInWithFaceBook} className={'w-full   p-2 rounded-md flex items-center bg-facebook mb-2'}>
                            <Image src={'/images/facebook.png'} alt={'Facebook Image'} width={30} height={30}/>
                            <div className={'w-3/4 text-center text-sm text-white'}>
                                Continue With Facebook
                            </div>
                        </button>
                        <div className={'relative flex items-center'}>
                            <div className={'flex-grow border-t border-gray-400'}></div>
                            <span className={'flex-shrink mx-4 text-gray-400'}>or</span>
                            <span className={'flex-grow border-t border-gray-400'}></span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={'w-full mt-3'}>
                                <input
                                    {...register('email')}
                                    type="text" placeholder={'Email Address'}
                                       className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                            </div>
                            <div className={'w-full mt-3'}>
                                <input
                                    {...register('password')}
                                    type="password" placeholder={'Password'}
                                       className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                            </div>
                            <div className={'w-full mt-3 text-right text-xs'}>
                                <Link href={'/auth/reset'}>
                                    <a className={'text-red-500'}>Forgot Password?</a>
                                </Link>
                            </div>
                            <div className={'w-full mt-3'}>
                                <button
                                    disabled={loading}
                                    className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                                    {loading ? 'Please wait...' : 'Login'}
                                </button>
                            </div>
                        </form>
                        {/* Login Option Area */}
                        <div className={'flex flex-col justify-center items-center text-xs  my-4'}>
                            <span className={'hidden md:block mb-4 font-bold '}>
                                OR
                            </span>
                            {/*<p className={'text-sm mb-4'}>*/}
                            {/*    Sign up with*/}
                            {/*    <Link href={'/'}>*/}
                            {/*        <a className={'text-teal-400 font-semibold mx-2'}>*/}
                            {/*            Facebook*/}
                            {/*        </a>*/}
                            {/*    </Link>*/}
                            {/*    Or*/}
                            {/*    <Link href={'/'}>*/}
                            {/*        <a className={'text-teal-400 font-semibold mx-2'}>*/}
                            {/*            Google*/}
                            {/*        </a>*/}
                            {/*    </Link>*/}
                            {/*</p>*/}
                            <p className={''}>
                            <span className={'mr-1'}>
                                Not register yet?
                            </span>
                                <Link href={'/auth/signup'}>
                                    <a className={'text-teal-400 font-semibold'}>
                                        Create Account.
                                    </a>
                                </Link>
                            </p>
                        </div>
                        {/*  End Login Option Area  */}
                    </div>
                </div>
                <div className={'hidden md:block w-1/2'}>
                    <Image src={'/images/login-illustration.png'} alt={'illustration bg'} height={450} width={575}/>
                </div>
                {/*</div>*/}

            </div>
        </AuthLayout>
    )
}


export default Login
