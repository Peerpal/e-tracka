import {NextPage} from "next";
import AuthLayout from "../../../components/Layouts/Auth";
import Image from "next/image";
import Link from "next/link";
import {useMutation} from "@apollo/client";
import {CREATE_USER, LOGIN_USER} from "../../../graphql/mutations";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginValidation} from "../../../validations";
import {UserSubmitForm} from "../login";
import {toast} from "react-toastify";

const Email: NextPage = () => {
    const [createAccount, {loading}] = useMutation(CREATE_USER)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(loginValidation)
    });


    const onSubmit = async (data: UserSubmitForm) => {

        await createAccount({
            variables: {
                input: {
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password,
                }
            }
        }).then(({data}) => {
            if (data?.register) {
                // localStorage.setItem('etracka_user', JSON.stringify(data?.createUser))
                toast.success("Account has been created, Please complete Setup")
                router.push('/auth/signup/verify')

            }
        }).catch(error => toast.error(error.message));
    };

    return (
        <AuthLayout>
            <div className={'w-full flex justify-between items-start'}>
                {/*<div className={'py-12 flex items-center'}>*/}
                <div className={'w-full md:w-1/2 flex justify-center items-center'}>
                    <div className={'w-full md:w-8/12 text-center'}>
                        <h1 className={'text-2xl mb-4'}>Signup</h1>
                        <p className={'text-sm'}>
                            Sign up with
                            <Link href={'/'}>
                                <a className={'text-teal-400 font-semibold mx-2'}>
                                    Facebook
                                </a>
                            </Link>
                            Or
                            <Link href={'/'}>
                                <a className={'text-teal-400 font-semibold mx-2'}>
                                    Google
                                </a>
                            </Link>
                        </p>
                        {/* Signup Form Area */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={'w-full mt-4'}>
                                <input
                                    {...register('email')}
                                    type="text"
                                    placeholder={'Email Address'}
                                    className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                />
                            </div>
                            <div className={'w-full mt-4'}>
                                <input
                                    {...register('password')}
                                    type="password"
                                    placeholder={'Password'}
                                    className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                />
                            </div>
                            <div className={'w-full mt-8'}>
                                <button
                                    className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}
                                disabled={loading}
                                >
                                    {loading ? 'Please wait...' : 'Sign up'}
                                </button>
                            </div>
                        </form>
                        {/* Login Option Area */}
                        <div className={'flex text-xs pt-3 border-t border-t-gray-200 my-16'}>
                            <span className={'mr-1'}>
                                Already have an E-tracka account
                            </span>
                            <Link href={'/auth/login'}>
                                <a className={'text-teal-400 font-semibold'}>
                                    Login
                                </a>
                            </Link>
                        </div>
                        {/*  End Login Option Area  */}
                    </div>
                </div>
                <div className={'hidden md:block w-1/2'}>
                    <Image src={'/images/signup-illustration.png'} alt={'illustration bg'} height={450} width={575}/>
                </div>
                {/*</div>*/}

            </div>
        </AuthLayout>
    )

}

export default Email
