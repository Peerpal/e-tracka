import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import {useMutation, useQuery} from "@apollo/client";
import {USER_PROPERTIES_QUERY} from "../../graphql/queries";
import Select from "react-select";
import {useUser} from "../../utils/store";
import {Formik} from "formik";
import {addTenantValidation} from "../../validations";
import {useRef} from "react";
import {CREATE_TENANCY} from "../../graphql/mutations";
import {toast} from "react-toastify";
import {useRouter} from "next/router";


const DashboardTenantAdd: NextPage = () => {
    const imageSelector = useRef<HTMLInputElement>(null)
    const { user } = useUser()
    const router = useRouter()
    const {data} = useQuery(USER_PROPERTIES_QUERY, {
        variables: {
            userId: user?.id,
        }
    })

    const [createTenancy, {loading}] = useMutation(CREATE_TENANCY)

    const submitForm = async (values: any) => {
        await createTenancy({
            variables: {
                input: {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    property: values.property?.value,
                    rent: `${values.rent}`,
                    amountPaid: `${values.amountPaid}`,
                    from: values.from,
                    to: values.to,
                    apartmentType: values.apartmentType,
                    apartmentNumber: values.apartmentNumber,
                    nextOfKinName: `${values.nextOfKinName}`,
                    nextOfKinAddress: values.nextOfKinAddress,
                    nextOfKinPhone: `${values.nextOfKinPhone}`,
                    image: values.image,
                }
            }
        }).then(({data}) => {
            if (data?.createTenancy) {
                toast.success("New Tenant added");
                router.push('/account/dashboard')
            }
        }).catch(error => toast.error(error.message))
    }

return (
    <DashboardLayout>
        <div className={'w-full md:flex md:justify-center md:m-12 md:p-8 border border-2 border-orange-100 rounded-md'}>
            <div className={'w-full md:w-2/3 p-4'}>
                <div className={'w-full text-center'}>
                    <Image onClick={() => imageSelector.current && imageSelector.current.click()} src={'/images/placeholder.png'} width={50} height={50}/>
                    <span className={'block'}>Upload your picture</span>
                </div>
                <div>
                    <Formik initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        property: '',
                        apartmentType: '',
                        apartmentNumber: '',
                        rent: '',
                        amountPaid: '',
                        from: '',
                        to: '',
                        nextOfKin: '',
                        nextOfKinAddress: '',
                        nextOfKinPhone: '',
                        image: ''
                    }}
                   onSubmit={async (values) => {
                       await submitForm(values);
                   }}
                   validationSchema={addTenantValidation}
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
                                    <input
                                        onChange={({target}) => {
                                            setFieldValue("image", target.files && target.files[0]);
                                            console.log(values)
                                            console.log(target.files)
                                        }}
                                        type="file"
                                        name="image"
                                        ref={imageSelector}
                                        style={{
                                            display: 'none'
                                        }}/>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Full Name</label>
                                        <input
                                            name={"name"}
                                            onChange={handleChange}
                                            value={values.name}
                                            type="text"
                                            placeholder={'Full Name'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                        />
                                        {errors &&
                                            touched.name &&
                                            errors.name && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.name}</span>
                                            )}
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Phone</label>
                                        <input
                                            name={"phone"}
                                            onChange={handleChange}
                                            value={values.phone}
                                            type="text"
                                            placeholder={'Phone Number'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                        />
                                        {errors &&
                                            touched.phone &&
                                            errors.phone && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.phone}</span>
                                            )}
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Email</label>
                                        <input
                                            name={"email"}
                                            onChange={handleChange}
                                            value={values.email}
                                            type="text"
                                            placeholder={'Email Address'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                        />
                                        {errors &&
                                            touched.email &&
                                            errors.email && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.email}</span>
                                            )}
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Property</label>
                                        <Select

                                            onChange={(option) => {
                                                setFieldValue('property', option)
                                            }}
                                            value={values.property}
                                            options={data?.properties?.map((p: any) => {
                                                return {
                                                    value: p.id,
                                                    label: p.title,
                                                }


                                            })}
                                            inputValue={'Select Property'}
                                        />
                                        {errors &&
                                            touched.property &&
                                            errors.property && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.property}</span>
                                            )}
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Apartment Type</label>
                                        <input
                                            name={"apartmentType"}
                                            onChange={handleChange}
                                            value={values.apartmentType}
                                            type="text"
                                            placeholder={'Apartment Type (2 bed flat, 3 bed duplex. etc,)'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                        />
                                        {errors &&
                                            touched.apartmentType &&
                                            errors.apartmentType && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.apartmentType}</span>
                                            )}
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Apartment Number</label>
                                        <input
                                            name={"apartmentNumber"}
                                            onChange={handleChange}
                                            value={values.apartmentNumber}
                                            type="text"
                                            placeholder={'Apartment Number'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                        {errors &&
                                            touched.apartmentNumber &&
                                            errors.apartmentNumber && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.apartmentNumber}</span>
                                            )}
                                    </div>

                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Rent Amount</label>
                                        <input
                                            name={"rent"}
                                            onChange={handleChange}
                                            value={values.rent}
                                            type="number"
                                            placeholder={'Rent Amount'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                        />
                                        {errors &&
                                            touched.rent &&
                                            errors.rent && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.rent}</span>
                                            )}
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Amount Paid</label>
                                        <input
                                            name={"amountPaid"}
                                            onChange={handleChange}
                                            value={values.amountPaid}
                                            type="number"
                                            placeholder={'Amount Paid'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                        />
                                        {errors &&
                                            touched.amountPaid &&
                                            errors.amountPaid && (
                                                <span className={'text-sm text-red-500 mt-2'}>{errors.amountPaid}</span>
                                            )}
                                    </div>

                                    <div className="w-full flex mt-3">
                                        <div className={'mr-2'}>
                                            <label className={'text-gray-500 px-2 mb-2'}>From</label>
                                            <input
                                                name={"from"}
                                                onChange={handleChange}
                                                value={values.from}
                                                type="date"
                                                placeholder={'Amount Paid'}
                                                className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                            />
                                        </div>
                                        <div>
                                            <label className={'text-gray-500 px-2 mb-2'}>To</label>
                                            <input
                                                name={"to"}
                                                onChange={handleChange}
                                                value={values.to}
                                                type="date"
                                                className={'w-full px-4 mr-2 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                            />
                                        </div>

                                    </div>

                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Next of Kin</label>
                                        <input
                                            name={"nextOfKin"}
                                            onChange={handleChange}
                                            value={values.nextOfKin}
                                            type="text"
                                            placeholder={'Next of Kin'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Next of Kin Address</label>
                                        <input
                                            name={"nextOfKinAddress"}
                                            onChange={handleChange}
                                            value={values.nextOfKinAddress}
                                            type="text"
                                            placeholder={'Next of Kin Address'}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <label className={'text-gray-500 px-2 mb-2'}>Next of Kin Phone</label>
                                        <input
                                            name={"nextOfKinPhone"}
                                            onChange={handleChange}
                                            value={values.nextOfKinPhone}
                                            type="text"
                                            placeholder={'Next of Kin Phone Number   '}
                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                    </div>
                                    <div className={'w-full mt-3'}>
                                        <button
                                            type={'submit'}
                                            className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                    </Formik>
                </div>
            </div>
        </div>
    </DashboardLayout>
)
}

export default DashboardTenantAdd
