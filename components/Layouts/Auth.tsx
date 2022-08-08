import {FC} from "react";
import Link from "next/link";


type Props = {
    children: JSX.Element | JSX.Element[]
}

const AuthLayout: FC<Props> = ({children}: Props) => {
    return (
        <div className={'min-h-screen bg-primary-light flex flex-col'}>
            <div className={'md:hidden flex justify-between items-center px-10 py-4 bg-white  border-b-2 border-b-gray-300 mb-8 sticky top-0 z-50'}>
                <Link href={'/'}>
                    <a className={'text-xl font-semibold'}>E-TRACKA</a>
                </Link>
            </div>
            <div className={'m-4 md:m-8 p-4 rounded bg-white'}>

                <div>
                    <div> {'<'} </div>

                    { children }
                    {/*<div className={'w-full flex justify-center items-center'}>*/}
                    {/*    <div className={'w-2/3 py-12 flex flex-col items-center'}>*/}
                    {/*        */}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
