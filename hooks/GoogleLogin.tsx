import React from "react"
import Image from "next/image"
import { useGoogleLogin } from "react-google-login"
import {toast} from "react-toastify";
import {useMutation} from "@apollo/client";
import {SOCIAL_AUTH} from "../graphql/mutations";
import {setCookie} from "cookies-next";
import {useUser} from "../utils/store";
import {useRouter} from "next/router";

function useLoginHook() {
    const {StoreUserDetails} = useUser()
    const router = useRouter()
    let {redirect} = router.query
    const [loginSocially, {loading: socialLoginLoading}] = useMutation(SOCIAL_AUTH)

    const handleCredentials = (data: any) => {
        let {user, access_token} = data;

        if (window) {
            localStorage.setItem('etr_token', access_token)
        }
        setCookie('etr_token', access_token)
        StoreUserDetails && StoreUserDetails(user, access_token)
        toast.success("Authentication successful")
        if (redirect) {
            router.push('/account/setup')
        } else {
            data?.authenticate?.accountType?.name === 'LANDLORD' ?
                router.push('/account/dashboard') :
                router.push('/account/dashboard/tenant')
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

    const onSuccess = async (res: any) => {
        await signInWithGoogle(res)
    }
    const onFailure = async (res: any) => {
        await signInWithGoogle(res)
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: '967504610977-0f2sg2eiflpu0k92hve1aqu1gpel3p0a.apps.googleusercontent.com',
        isSignedIn: true,
        accessType: 'offline'
    })

    return (
        <button onClick={signIn} className={'w-full p-2 rounded-md flex items-center bg-google mb-2'}>
            <Image src={'/images/google.png'} alt={'Google Image'} width={30} height={30}/>
            <div className={'w-3/4 text-center text-sm text-white'}>
                Continue With Google
            </div>
        </button>
    )
}

export default useLoginHook()
