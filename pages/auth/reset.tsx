import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import AuthLayout from "../../components/Layouts/Auth";


const Reset: NextPage = () => {

    return (
        <AuthLayout>
             <div className={'w-full flex justify-between items-start'}>
                {/*<div className={'py-12 flex items-center'}>*/}
                <div className={'w-1/2 flex justify-center items-center'}>
                    <div className={'w-8/12 text-center'}>
                        <h1 className={'text-2xl mb-4'}>Forgot Your Password?</h1>
                        <p className={'text-sm mb-12'}>
                            Enter your email and we will send you instruction
                        </p>
                        {/* Signup Form Area */}
                        <form>
                            <div className={'w-full mt-4'}>
                                <input type="text" placeholder={'Email Address'} className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                            </div>
                            <div className={'w-full mt-6'}>
                                <button className={'w-full px-12 py-3 bg-primary text-sm text-white font-semibold rounded-xl hover:bg-primary-light'}>Send reset instruction</button>
                            </div>
                        </form>
                        {/* Login Option Area */}
                        <div className={'flex flex-col justify-center items-center text-xs  my-16'}>

                            <Link href={'/auth/login'}>
                                <a className={'text-teal-400 font-semibold'}>
                                    Back to sign in
                                </a>
                            </Link>
                        </div>
                        {/*  End Login Option Area  */}
                    </div>
                </div>
                <div className={'w-1/2'}>
                    <Image src={'/images/login-illustration.png'} alt={'illustration bg'} height={500} width={575}/>
                </div>
                {/*</div>*/}

            </div>
        </AuthLayout>
    )
}

export default Reset