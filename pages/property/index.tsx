import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import {useLazyQuery, useQuery} from "@apollo/client";
import {PROPERTIES, SEARCH_PROPERTY} from "../../graphql/queries";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Formik} from "formik";


const PropertyIndex: NextPage = () => {
    const [fetchProperties, {data, loading}] = useLazyQuery(PROPERTIES)
    const [searchProperties, {data: searchResults, loading: searching}] = useLazyQuery(SEARCH_PROPERTY)
    const [properties, setProperties] = useState([])
    const [mode, setMode] = useState("RENT")

    let tabs = [
        {
            title: "Rent",
            value: "RENT",
        }, {
            title: "Buy",
            value: "BUY",
        }, {
            title: "Shortlet",
            value: "SHORTLET",
        },
    ]
    let states = [
        'Abia', 'Adamawa', 'Akwa Ibom',
        'Anambra', 'Bauchi', 'Bayelsa',
        'Benue', 'Borno', 'Cross River',
        'Delta', 'Ebonyi', 'Edo',
        'Ekiti', 'Enugu', 'Gombe',
        'Imo', 'Jigawa', 'Kaduna',
        'Kano', 'Kastina', 'Kebbi',
        'Kogi', 'Kwara', 'Lagos',
        'Nasarawa', 'Niger', 'Ogun',
        'Ondo', 'Osun', 'Oyo',
        'Plateau', 'Rivers', 'Sokoto',
        'Taraba', 'Yobe', 'Zamfara',
        'FCT'
    ]

    useEffect(() => {
        fetchProperties({
            variables: {
                type: mode
            }
        }).then(({data}) => {
            if (data?.getProperties) {
                setProperties(data?.getProperties)
            }
        })
    }, [mode])

    return (
        <DashboardLayout>
            <div className={'w-full '}>
                <Formik initialValues={{
                    state: '',
                    rooms: '',
                    price: '',
                }} onSubmit={(values, {resetForm}) => {
                    searchProperties({
                        variables: {
                            state: values.state,
                            price: values.price.split('-'),
                            rooms: values.rooms
                        }
                    }).then(({data}) => {
                        if (data?.searchProperty) {
                            setProperties(data?.searchProperty)
                        }
                    })
                }}>
                    {({
                          values,
                          handleChange,
                          setFieldValue,
                          handleSubmit,
                          errors,
                          touched,
                      }) => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className={'bg-[#F5F5F5] border rounded-md m-12'}>
                                    <div className={'tabs flex justify-center items-center p-4 mb-4'}>
                                        <button
                                            className={'px-4 py-1 bg-primary text-sm text-black font-semibold rounded-md hover:bg-primary-light mr-8'}>Rent
                                        </button>
                                        <button
                                            className={'px-4 py-1 bg-transparent text-sm text-black font-semibold rounded-md hover:bg-primary-light mr-8'}>Buy
                                        </button>
                                        <button
                                            className={'px-4 py-1 bg-transparent text-sm text-black font-semibold rounded-md hover:bg-primary-light mr-8'}>Shortlet
                                        </button>
                                    </div>

                                    <div
                                        className={'flex justify-around flex-wrap sm:flex-nowrap bg-white rounded md:m-4 p-2 md:p-4'}>
                                        <div className={'flex-shrink md:w-3/12 mr-1 md:mr-3'}>
                                            <p className={'mb-1'}>
                                                {/*<span></span>*/}
                                                <span className={'text-xs font-bold'}>Location</span>
                                            </p>
                                            <select
                                                onChange={(e) => setFieldValue("location", e.target.value)}
                                                className={'w-full py-2 pr-10 bg-[#F5F5F5] rounded text-left text-xs text-gray-400'}>
                                                {
                                                    states.map((state: any, index: number) => (
                                                        <option key={index}>{state}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        {/*<div className={'flex-shrink md:w-3/12 mr-1 md:mr-3'}>*/}
                                        {/*    <p className={'mb-1'}>*/}
                                        {/*        /!*<span></span>*!/*/}
                                        {/*        <span className={'text-xs font-bold'}>Apartment Type</span>*/}
                                        {/*    </p>*/}
                                        {/*    <select*/}
                                        {/*        className={'w-full py-2 pr-10 bg-[#F5F5F5] rounded text-left text-xs text-gray-400'}>*/}
                                        {/*        <option>Location</option>*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                        <div className={'flex-shrink md:w-3/12 mr-1 md:mr-3'}>
                                            <p className={'mb-1'}>
                                                {/*<span></span>*/}
                                                <span className={'text-xs font-bold'}>Nos. of Rooms</span>
                                            </p>
                                            <select
                                                onChange={(e) => setFieldValue("rooms", e.target.value)}
                                                className={'w-full py-2 pr-10 bg-[#F5F5F5] rounded text-left text-xs text-gray-400'}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                            </select>
                                        </div>
                                        <div className={'flex-shrink md:w-3/12'}>
                                            <p className={'mb-1'}>
                                                {/*<span></span>*/}
                                                <span className={'text-xs font-bold'}>Price Range</span>
                                            </p>

                                            <select
                                                onChange={(e) => setFieldValue("price", e.target.value)}
                                                className={'w-full py-2 pr-10 bg-[#F5F5F5] rounded text-left text-xs text-gray-400'}>
                                                <option value={'0-100000'}>0 - N100,000</option>
                                                <option value={'100000-500000'}>N100,000 - N500,000</option>
                                                <option value={'500000-1000000'}>N500,000 - N1,000,000</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'flex justify-center'}>
                                        <button
                                            className={'px-12 py-2 bg-primary text-sm text-black font-semibold border border-black rounded-md hover:bg-primary-light'}>
                                            Search Property
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </Formik>

                <div>
                    <p className={'text-center text-2xl font-semibold'}>Featured Properties</p>
                    <div className={'tabs flex justify-center items-center mt-4 mb-8'}>
                        {
                            tabs?.map((tab: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setMode(tab.value)}
                                    className={`px-4 py-1 ${tab.value === mode ? 'bg-primary' : 'bg-transparent'} text-sm text-black font-semibold rounded-md hover:bg-primary-light mr-8`}>
                                    {tab.title}
                                </button>
                            ))
                        }

                    </div>

                    <div className={'flex flex-col md:flex-row  mb-9'}>
                        {
                            loading ?
                                <p className={'w-full flex justify-center items-center text-center py-12'}>Loading...</p> :
                                !properties?.length ?
                                    <p className={'w-full flex justify-center items-center text-center py-12'}>No
                                        Records Found</p> :
                                    properties?.map((property: any, index: number) => (
                                        <Link key={index} href={`/property/show/${property.id}`}>
                                            <div className={'w-full md:w-3/12 bg-[#F5F5F5] rounded-md mr-2 mb-8'}>
                                                <div className={'w-full h-60 md:h-40 rounded-md mb-4 rounded-md relative'}>
                                                    <Image className={'rounded-md'} src={`${property?.medially[0]?.fileUrl}`} layout={'fill'}/>
                                                </div>
                                                <div className={'md:px-3 pb-4 text-xl md:text-xs px-2'}>
                                                    <span
                                                        className={'block text-sm font-bold mb-1 '}>₦{property?.amount || '500,000'}/year</span>
                                                    <span className={'block'}>{property?.title}</span>
                                                    <span className={'block flex items-center'}>
                                <Image src={'/images/location.png'} width={14} height={14}/>
                                <span className={'ml-1'}>{property?.addressLine1}</span>
                            </span>
                                                    <span className={'block flex items-center'}>
                                <Image src={'/images/bed.png'} width={14} height={14}/>
                                <span className={'ml-1'}>{property?.rooms || '1'} Bedrooms </span>
                            </span>
                                                    <span className={'block flex items-center'}>
                                <Image src={'/images/toilet.png'} width={14} height={14}/>
                                <span className={'ml-1'}>{property?.toilets || '1'} Toilets </span>
                            </span>

                                                </div>
                                            </div>
                                        </Link>
                                    ))
                        }
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}


export default PropertyIndex
