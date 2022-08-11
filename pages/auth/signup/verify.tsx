import {NextPage} from "next";
import AuthLayout from "../../../components/Layouts/Auth";
import Link from "next/link";


const Verify: NextPage = () => {

    return (
        <AuthLayout>
            <div className={'flex justify-center justify-items-center p-1 md:py-12'}>
                <div className={'w-full md:w-1/3 text-xs'}>
                    <h1 className={'text-2xl text-center mb-4'}>Check your email</h1>
                    <p className={'text-left mb-6'}>
                        We have sent a message to email with a link to activate your account
                    </p>
                    <div>
                        <p className={'text-sm font-bold'}>
                            Didn’t get an email?
                        </p>
                        <p className={'mb-6'}>
                        If you don’t see an email from us within the next few minutes, a few things could have happened
                    </p>
                    </div>
                </div>
            </div>
            {/*<div className={'w-full flex flex-col md:flex-row justify-between items-centerp-1 md:px-12'}>*/}
            {/*    <Link href={''}>*/}
            {/*        <a className={'text-orange-500 text-xs md:text-sm'}>*/}
            {/*            Re-enter your email and try again*/}
            {/*        </a>*/}
            {/*    </Link>*/}
            {/*    <Link href={''}>*/}
            {/*        <a className={'text-green-500 text-xs md:text-sm'}>*/}
            {/*            Continue*/}
            {/*        </a>*/}
            {/*    </Link>*/}
            {/*</div>*/}
        </AuthLayout>
    )
}

export default Verify
