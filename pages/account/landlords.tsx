import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import {useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_TENANTS, SEARCH_LANDLORDS} from "../../graphql/queries";
import Link from "next/link";


const Landlords: NextPage = () => {
    const [term, setTerm] = useState('')
    const [getTenants, {data, loading}] = useLazyQuery(SEARCH_LANDLORDS, {
        variables: {
            term
        }
    })

    const searchLandlords = async (e: any) => {
        e.preventDefault()
        await getTenants()
    }
  return (
      <DashboardLayout>

          <div className={'w-full flex flex-col justify-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
              <div className={'w-full p-4 flex flex-col justify-center items-center'}>
                  <div className={'w-1/2 mt-3 relative mb-12'}>
                      <form onSubmit={searchLandlords}>
                          <input type="text" placeholder={'Search For Tenant Here...'}
                                 onChange={e => setTerm(e.target.value)}
                                 className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                      </form>
                  </div>
                  {
                      data?.searchLandlords?.map((landlord: any, index: number) => (
                          <div key={index} className={'w-full flex justify-between mb-4 pb-2 border-b border-b-2 border-b-gray-200 capitalize'}>
                              <div className={'w-1/2 flex items-start'}>
                                  <Image src={landlord.avatar} width={50} height={50}/>
                                  <div className={'ml-3 text-left text-sm'}>
                                      <p className={'text-xl font-semibold mb-2'}>{landlord?.name}</p>
                                      <p className={'mb-2'}>{landlord?.email}</p>
                                      <p className={'mb-2'}>{landlord.phone}</p>
                                      <p className={'mb-2'}>{landlord.address}</p>
                                  </div>
                              </div>
                              <div className={'w-1/2 flex justify-end'}>
                                  <ul className={'text-sm'}>
                                      {/*<li className={'mb-2 pb-1 border-b border-b-transparent hover:border-black'}>*/}
                                      {/*    <Link href={''}>*/}
                                      {/*        <a className={'flex justify-between'}>*/}
                                      {/*            <span className={"mr-6"}>View Tenant report</span>*/}
                                      {/*            <span> {'>'} </span>*/}
                                      {/*        </a>*/}
                                      {/*    </Link>*/}
                                      {/*</li>*/}
                                  </ul>
                              </div>
                          </div>
                      ))
                  }

              </div>
          </div>
      </DashboardLayout>
  )
}

export default Landlords
