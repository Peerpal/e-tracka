import {NextPage} from "next";
import AuthLayout from "../components/Layouts/Auth";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {useMutation} from "@apollo/client";
import {useEffect} from "react";
import {VERIFY_EMAIL} from "../graphql/mutations";
import {setCookie} from "cookies-next";
import {useUser} from "../utils/store";


const EmailVerify: NextPage = () => {
    const router = useRouter()

    const { token } = router.query

    const {StoreUserDetails} = useUser()

    console.log(token)

    const [verifyEmail, {loading}] = useMutation(VERIFY_EMAIL)

    useEffect(() => {
        if (token) {
            verifyEmail({
                variables: {
                    input: {
                        token
                    }
                }
            }).then(({data}) => {
                if (data?.verifyEmail) {
                    let {user, access_token} = data?.verifyEmail;

                    if (window) {
                        localStorage.setItem('etr_token', access_token)
                    }
                    setCookie('etr_token', access_token)
                    StoreUserDetails && StoreUserDetails(user, access_token)
                    toast.success("Email Verification successful")

                    window.location.href = '/account/setup'
                }
            }).catch(error => toast.error("Email verification could not be completed"))
        }
    }, [token])

    return (
        <AuthLayout>
            <div className={'flex justify-center justify-items-center p-1 md:py-12'}>
                <div className={'w-full md:w-1/3 text-xs'}>
                    <h1 className={'text-2xl text-center mb-4'}>
                        {
                            loading ? 'Verifying email...' : 'Email Verification Complete'
                        }
                    </h1>

                </div>
            </div>
        </AuthLayout>
    )
}


export default EmailVerify
