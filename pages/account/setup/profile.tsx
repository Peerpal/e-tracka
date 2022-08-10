import {NextPage} from "next";
import AuthLayout from "../../../components/Layouts/Auth";
import Image from "next/image";
import {useMutation} from "@apollo/client";
import {CREATE_USER_PROFILE} from "../../../graphql/mutations";
import {useRouter} from "next/router";
import {createProfileValidation} from "../../../validations";
import {toast} from "react-toastify";
import OnboardTabs from "../../../components/onboarding/OnboardTabs";
import {useRef} from "react";
import {Formik} from "formik";

export interface UserProfileForm {
    name: string;
    dateOfBirth: string;
    sex: string;
    phone: string;
    address: string;
}

const AccountSetup: NextPage = () => {
    const [createProfile, {loading}] = useMutation(CREATE_USER_PROFILE)
    const imageSelector = useRef<HTMLInputElement>(null)

    const router = useRouter()

    const onSubmit = async (data: any) => {
        await createProfile({
            variables: {
                input: {
                    ...data
                }
            }
        }).then(({data}) => {
            if (data?.updateProfile) {
                toast.success("Your profile has been created.")

               if (data?.updateProfile?.accountType?.name === 'LANDLORD') {
                   router.push('/account/setup/property')
               } else {
                   router.push('/account/setup/verification')
               }
            }
        }).catch(error => toast.error(error.message));
    };


    return (
        <AuthLayout>
            <div className={'flex justify-center justify-items-center py'}>
                <div className={'w-full md:w-10/12 flex flex-col justify-center'}>
                    <div>
                        <OnboardTabs currentTab={'personal'}/>
                        <div className={'w-full flex justify-center'}>
                            <div className={'w-full md:w-1/2 text-center py-4'}>
                                <h1 className={'text-2xl mb'}>Get Started</h1>
                                <span className={'block mb-3'}>
                                  Tell us about yourself
                              </span>
                                <div className={"mt-2"}>
                                    <Formik
                                        initialValues={{
                                            name: '',
                                            dateOfBirth: '',
                                            sex: '',
                                            phone: '',
                                            address: '',
                                            avatar: ''
                                            }}
                                        validationSchema={createProfileValidation}
                                        onSubmit={async (values, { resetForm }) => {
                                            await onSubmit(values)
                                        }}
                                    >
                                        {({
                                              values,
                                              handleChange,
                                              setFieldValue,
                                              handleSubmit,
                                            errors,
                                            touched,
                                          }) => (
                                            <>
                                                <form autoComplete={'false'} onSubmit={handleSubmit}>
                                                    <Image onClick={() => imageSelector.current && imageSelector.current.click()} src={'/images/placeholder.png'} width={50} height={50}/>
                                                    <span className={'block text-sm'}>Upload your picture here</span>
                                                    {errors &&
                                                        touched.avatar &&
                                                        errors.avatar && (
                                                            <span className={'text-sm text-red-500 mt-2'}>{errors.avatar}</span>
                                                        )}
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            onChange={({target}) => {
                                                                setFieldValue("avatar", target.files && target.files[0]);
                                                                console.log( target && target.files)
                                                            }}
                                                            type="file"
                                                            name="avatar"
                                                            ref={imageSelector}
                                                            style={{
                                                                display: 'none'
                                                            }}/>
                                                        <input
                                                            onChange={handleChange}
                                                            name={'name'}
                                                            value={values.name}
                                                            type="text" placeholder={'Full Name'}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        {errors &&
                                                            touched.name &&
                                                            errors.name && (
                                                                <span className={'text-sm text-red-500 mt-2'}>{errors.name}</span>
                                                            )}
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            onChange={handleChange}
                                                            name={'dateOfBirth'}
                                                            value={values.dateOfBirth}
                                                            type="date" placeholder={'Date of Birth'}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        {errors &&
                                                            touched.dateOfBirth &&
                                                            errors.dateOfBirth && (
                                                                <span className={'text-sm text-red-500 mt-2'}>{errors.dateOfBirth}</span>
                                                            )}
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <select
                                                            onChange={handleChange}
                                                            name={'sex'}
                                                            defaultValue={'gender'}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                                        >
                                                            <option value={'gender'} disabled>-- Select Gender --</option>
                                                            <option value="MALE">Male</option>
                                                            <option value="FEMALE">Female</option>

                                                        </select>
                                                        {errors &&
                                                            touched.sex &&
                                                            errors.sex && (
                                                                <span className={'text-sm text-red-500 mt-2'}>{errors.sex}</span>
                                                            )}

                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            onChange={handleChange}
                                                            name={'phone'}
                                                            value={values.phone}
                                                            type="text" placeholder={'Phone Number'}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        {errors &&
                                                            touched.phone &&
                                                            errors.phone && (
                                                                <span className={'text-sm text-red-500 mt-2'}>{errors.phone}</span>
                                                            )}
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input

                                                            onChange={handleChange}
                                                            name={'address'}
                                                            value={values.address}
                                                            type="text" placeholder={'Address'}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        {errors &&
                                                            touched.address &&
                                                            errors.address && (
                                                                <span className={'text-sm text-red-500 mt-2'}>{errors.address}</span>
                                                            )}
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <button

                                                            className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}
                                                            disabled={loading}
                                                        > {
                                                            loading ? 'Saving...' : 'Save and continue'
                                                        }
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                        )}

                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default AccountSetup
