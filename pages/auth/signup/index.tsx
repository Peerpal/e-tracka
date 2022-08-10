import {NextPage} from "next";
import AuthLayout from "../../../components/Layouts/Auth";
import Image from "next/image";
import Link from "next/link";
import {toast} from "react-toastify";
import {signIn} from "next-auth/react";
import {useMutation} from "@apollo/client";
import {SOCIAL_AUTH} from "../../../graphql/mutations";
import {useUser} from "../../../utils/store";
import {useRouter} from "next/router";
import GoogleLogin from "react-google-login";
import {useGoogleLogin} from "@react-oauth/google";


const SignupIndex: NextPage = () => {
    const {StoreUserDetails} = useUser()
    const [loginSocially, {loading: socialLoginLoading}] = useMutation(SOCIAL_AUTH)
    const router = useRouter()

    const handleCredentials = (data: any) => {
        let {user, access_token} = data;
        localStorage.setItem('etr_token', access_token)
        StoreUserDetails && StoreUserDetails(user, access_token)
        toast.success("Authentication successful")
            window.location.href = '/account/setup'

    }

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
        await loginSocially({
            variables: {
                accessToken: response.tokenId,
                provider: "facebook"
            }
        }).then(({data}) => {
            if (data?.socialLogin) {
                handleCredentials(data?.socialLogin)
            }
        }).catch(error => toast.error(error.me))
    }

    const googleLogin = useGoogleLogin({
        onSuccess: response =>  signInWithGoogle(response),
    });


    return (
        <AuthLayout>
           <div className={'w-full flex justify-center items-center'}>
               <div className={'w-full md:w-2/3 py-12 flex flex-col items-center'}>
                   <h1 className={'text-3xl'}>Signup</h1>
                   <span className={'text-xs text-center mt-4 mb-10'}>
                We are excited for you to join us and get all your real estate data
            </span>

                   {/* Social Buttons Area */}
                   {/*<GoogleLogin*/}
                   {/*    clientId={'967504610977-0f2sg2eiflpu0k92hve1aqu1gpel3p0a.apps.googleusercontent.com'}*/}
                   {/*    buttonText="Log in with Google"*/}
                   {/*    render={props => (*/}
                   {/*        */}
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
                   <button onClick={signInWithFaceBook} className={'w-full p-2 rounded-md flex items-center bg-facebook mb-2'}>
                       <Image src={'/images/facebook.png'} alt={'Facebook Image'} width={30} height={30}/>
                       <div className={'w-3/4 text-center text-sm text-white'}>
                           Continue With Facebook
                       </div>
                   </button>
                   <Link href={'/auth/signup/email'}>
                       <a className={'w-full md:w-4/12 p-3 rounded flex items-center bg-primary border border-black mb-4'}>
                           <div className={'w-full text-center text-sm text-black'}>
                               Continue With Email
                           </div>
                       </a>
                   </Link>
                   {/*  End Social Buttons Area  */}

                   {/* Login Option Area */}
                   <div className={'flex text-xs pb-3 border-b border-b-gray-200 mb-8'}>
                <span className={'mr-1'}>
                    Already have an E-tracka account?
                </span>
                       <Link href={'/auth/login'}>
                           <a className={'text-teal-400 font-semibold'}>
                               Login
                           </a>
                       </Link>
                   </div>
                   {/*  End Login Option Area  */}

                   {/* Terms Area */}
                   <p className={'w-full md:w-1/2 text-xs text-center'}>
                       By clicking Sign up with email or continuing Google or Facebook, you agree to the E-tracka
                       <span className={'ml-2'}>
                    <Link href={'/'}>
                        <a className={'text-orange-500'}>
                            Terms and Condition.
                        </a>
                    </Link>
                </span>
                   </p>
                   {/*  End Terms Area  */}
               </div>
           </div>
        </AuthLayout>
    )
}


export default SignupIndex
