import type {NextPage} from 'next'
import AccountDashboard from "./account/dashboard";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div className={'bg-[#E5E5E5]'}>
            <header className={'hidden md:flex md:items-center bg-white px-10 sticky top-0 z-50'}>
                <div className={'flex-shrink'}>
                    <Image src={'/images/logo.png'} width={80} height={65}/>
                </div>
                <nav className={'flex-grow flex justify-center px-6'}>
                    <Link href={''}>
                        <a className={'mr-12 text-sm text-primary border-b border-b-2 border-b-primary hover:border-b-primary'}>Home</a>
                    </Link>

                    <Link href={''}>
                        <a className={'mr-12 text-sm border-b border-b-2 border-b-transparent hover:border-b-primary'}>Services</a>
                    </Link>
                    <Link href={''}>
                        <a className={'mr-12 text-sm border-b border-b-2 border-b-transparent hover:border-b-primary'}>About
                            Us</a>
                    </Link>
                    <Link href={''}>
                        <a className={'mr-12 text-sm border-b border-b-2 border-b-transparent hover:border-b-primary'}>Property</a>
                    </Link>
                </nav>
                <div className={'flex-shrink'}>
                    <Link href={'/auth/login'}>
                        <a className={'px-4 py-2 text-sm bg-primary rounded'}>Sign In</a>
                    </Link>
                </div>
            </header>
            <div className={'hero flex justify-between flex-col-reverse md:flex-row items-center p-8 mb-4 z-20'}>
                <div className={'w-full md:w-5/12'}>
                    <p className={'mb-3 text-2xl font-semibold text-white'}>
                        Your Trusted and Reliable Partner for Real Estate Data and Property Management in Nigeria.
                    </p>
                    <Link href={'/auth/login'}>
                        <a className={'px-4 py-2 text-sm bg-primary rounded'}>Sign In</a>
                    </Link>
                </div>
                <div className={'w-full md:w-7/12 mb-6'}>
                    <Image src={'/images/hero.png'} height={450} width={700}/>
                </div>
            </div>
            <div className={'flex justify-around flex-col md:flex-row py-8 px-10'}>
                <div className={'mr-3 text-center mb-2'}>
                    <Image src={'/images/twemoji_houses.png'} height={75} width={75}/>
                    <span className={'block text-xl mt-2 capitalize'}>
                        Get Data on properties
                    </span>
                    <span className={'block text-xs text-left'}>
                        Buy, rent and gather information on real estate properties
                    </span>
                </div>
                <div className={'mr-3 text-center mb-2'}>
                    <Image src={'/images/emojione_old-man-dark-skin-tone.png'} height={75} width={75}/>
                    <span className={'block text-xl mt-2 capitalize'}>
                       Get information on Landlords, Estate manager
                    </span>
                    <span className={'block text-xs text-left'}>
                        We give insights into their characteristics and characters which strengthen their agency’s advertising and promotion.
                    </span>
                </div>
                <div className={'mr-3 text-center mb-2'}>
                    <Image src={'/images/emojione-monotone_family-man-man-girl-girl.png'} height={75} width={75}/>
                    <span className={'block text-xl mt-2 capitalize'}>
                       Get information on Tenants
                    </span>
                    <span className={'block text-xs text-left'}>
                        We store tenancy data to improve your processes and enhance their experiences.
                    </span>
                </div>
                <div className={'mr-3 text-center mb-2'}>
                    <Image src={'/images/emojione-monotone_family-man-man-girl-girl.png'} height={75} width={75}/>
                    <span className={'block text-xl mt-2 capitalize'}>
                       Manage your Tenancy
                    </span>
                    <span className={'block text-xs'}>
                        Issue utility bills, rent receipts, payment reminders and notifications to your tenants. You can also chat with them in real-time.
                    </span>
                </div>

            </div>
            <div className={'hero2 p-8'}>
                <div className={'flex justify-center mt-[-30px]'}>
                    <input type="text" className={'w-full md:w-1/3 px-4 py-4 rounded border border-gray-200'}
                           placeholder={'Search House, Apartment, etc'}/>
                </div>
            </div>
            <div className={'text-center p-4'}>
                <p className={'text-2xl font-bold mb-3'}>
                    What Our Users Say
                </p>
                <div className={'flex flex-col md:flex-row px-4'}>
                    <div className={'w-full md:w-3/12 bg-white border border-orange-400 rounded-xl mr-8 mb-3 px-4'}>
                        <div className={'flex justify-start items-center py-3 border-b border-b-2 border-b-gray-300'}>
                            <Image src={'/images/face.png'} height={30} width={30}/>
                            <span className={'ml-3 text-sm'}>Herbert Sylvester</span>
                        </div>
                        <p className={'text-sm text-left px-1 pt-3 pb-10'}>
                            E-tracka is the easiest way to gather information from your tenants. I have experienced
                            seamless onboarding of my tenants.
                        </p>
                    </div>
                    <div className={'w-full md:w-3/12 bg-white border border-orange-400 rounded-xl mr-8 mb-3 px-4'}>
                        <div className={'flex justify-start items-center py-3 border-b border-b-2 border-b-gray-300'}>
                            <Image src={'/images/face.png'} height={30} width={30}/>
                            <span className={'ml-3 text-sm'}>Olayiwola Adeola</span>
                        </div>
                        <p className={'text-sm text-left px-1 pt-3 pb-10'}>
                            I list and rent my properties easily on E-tracka. It makes communication with my tenants
                            very effective. My tenants are wowed with the way I send reminders and issue payment
                            receipts to their emails.
                        </p>
                    </div>
                    <div className={'w-full md:w-3/12 bg-white border border-orange-400 rounded-xl mr-8 mb-3 px-4'}>
                        <div className={'flex justify-start items-center py-3 border-b border-b-2 border-b-gray-300'}>
                            <Image src={'/images/face.png'} height={30} width={30}/>
                            <span className={'ml-3 text-sm'}>Ikechukwu Julianna</span>
                        </div>
                        <p className={'text-sm text-left px-1 pt-3 pb-10'}>
                            I close my day by signing into E-tracka to join the conversations in the community group
                            chat. It is highly educational and insightful.
                        </p>
                    </div>
                    <div className={'w-full md:w-3/12 bg-white border border-orange-400 rounded-xl mr-8 mb-3 px-4'}>
                        <div className={'flex justify-start items-center py-3 border-b border-b-2 border-b-gray-300'}>
                            <Image src={'/images/face.png'} height={30} width={30}/>
                            <span className={'ml-3 text-sm'}>Haruna Ahmed</span>
                        </div>
                        <p className={'text-sm text-left px-1 pt-3 pb-10'}>
                            E-tracka is a wonderful innovation in Nigeria. It was easy for me to get an apartment simply
                            by searching for a property and I was able to chat directly with the property manager.
                        </p>
                    </div>

                </div>
            </div>
            <div className={'p-6 bg-gradient-to-b from-[#C5C5C5] to-[#000000]'}>
                <p className={'text-center text-2xl font-bold mb-3'}>
                    Pricing
                </p>

                <div className={'flex flex-col md:flex-row justify-center'}>
                    <div
                        className={'w-full md:w-1/4 text-center bg-white border border-orange-400 rounded-xl mr-8 mb-3 p-4'}>
                        <p className={'text-xl font-bold mb-1'}>
                            Platinum (3 Months)
                        </p>
                        <p className={'text-2xl font-bold mb-3'}>
                            N5,000
                        </p>
                        <ul>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>
                                        Manage Tenant
                                </span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Client’s Score</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>List Property</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Landlord</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Search Property</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Property History</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Join the community</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Send notifications</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Send bill and rent receipts</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Chat tenants and landlords</span>
                            </li>
                        </ul>

                        <button
                            className={'mt-8 text-white rounded-xl bg-[#FFA200] px-8 py-2 border border-2 border-[#E5E5E5]'}>
                            SUBSCRIBE
                        </button>
                    </div>
                    <div
                        className={'w-full md:w-1/4 text-center bg-white border border-orange-400 rounded-xl mr-8 mb-3 p-4'}>
                        <p className={'text-xl font-bold mb-1'}>
                            Silver (6 Months)
                        </p>
                        <p className={'text-2xl font-bold mb-3'}>
                            N8,000
                        </p>
                        <ul>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>
                                        Manage Tenant
                                </span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Client’s Score</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>List Property</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Landlord</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Search Property</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Property History</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Join the community</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Send notifications</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Send bill and rent receipts</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Chat tenants and landlords</span>
                            </li>
                        </ul>
                        <button
                            className={'mt-8 text-white rounded-xl bg-[#FFA200] px-8 py-2 border border-2 border-[#E5E5E5]'}>
                            SUBSCRIBE
                        </button>
                    </div>
                    <div
                        className={'w-full md:w-1/4 text-center bg-white border border-orange-400 rounded-xl mr-8 mb-3 p-4'}>
                        <p className={'text-xl font-bold mb-1'}>
                            Gold (1 Year)
                        </p>
                        <p className={'text-2xl font-bold mb-3'}>
                            N15,000
                        </p>
                        <ul>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>
                                        Manage Tenant
                                </span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Client’s Score</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>List Property</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Landlord</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Search Property</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Check Property History</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Join the community</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Send notifications</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Send bill and rent receipts</span>
                            </li>
                            <li className={'flex mb-4'}>
                                <Image src={'/images/checked.png'} height={15} width={15}/>
                                <span className={'ml-2 text-xs'}>Chat tenants and landlords</span>
                            </li>
                        </ul>

                        <button
                            className={'mt-8 text-white rounded-xl bg-[#FFA200] px-8 py-2 border border-2 border-[#E5E5E5]'}>
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </div>

            <div className={'text-center bg-black p-6 mb-12'}>
                <p className={'text-xl font-semibold text-white'}>
                    Ready to join the E-tracka family?
                </p>
                <p className={'text-sm font-semibold text-white mb-6'}>
                    Setting up your account is very easy
                </p>
                {/*<div className={'w-1/3 flex justify-center mt-12 mb-8'}>*/}
               <Link href={'/auth/signup'}>
                   <a
                       className={'w-full md:w-1/3 px-12 py-3 mt-12 mb-8 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                       Sign Up Free
                   </a>
               </Link>
                {/*</div>*/}
            </div>

            {/*    Footer Area */}
            <div className={'foooter'}>
                <div className={'pb-6 border-b border-b-2 border-b-[#C4C4C4]'}>
                    <div className={'mb-4 p-6'}>
                        <p className={'text-3xl font-bold'}>E-TRACKA</p>
                        <span className={'text-sm text-gray-600'}>Join our community live chat to interact with Real Estate Players.</span>
                    </div>
                    <div className={'flex flex-col md:flex-row justify-between px-6'}>
                        <div>
                            <p className={'text-xl font-bold mb-1'}>Landlord</p>
                            <ul>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Manage Tenant</a>
                                    </Link>
                                </li>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Check Client’s Score</a>
                                    </Link>
                                </li>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>List Property</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className={'text-xl font-bold mb-1'}>Tenant</p>
                            <ul>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Check Landlord</a>
                                    </Link>
                                </li>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Search Property</a>
                                    </Link>
                                </li>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Check Property History</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className={'text-xl font-bold mb-1'}>Resources</p>
                            <ul>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>About Us</a>
                                    </Link>
                                </li>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Contact Us</a>
                                    </Link>
                                </li>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Services</a>
                                    </Link>
                                </li>
                                <li className={'text-sm mb-1'}>
                                    <Link href={''}>
                                        <a>Help Centre</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'text-center p-2'}>
                    <p className={'mb-1'}>&copy; E-tracka. 2022</p>
                    <Image src={'/images/socials.png'} height={24} width={130}/>
                    <div className={'flex justify-center items-center my-3'}>
                        <Link href={''}>
                            <a className={'mr-3'}>Terms of Service </a>
                        </Link>
                        <div className={'w-[8px] h-[8px] rounded-full bg-black'}>

                        </div>
                        <Link href={''}>
                            <a className={'ml-3'}>Privacy policy</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
