import {FC} from "react";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import StarRatings  from "react-star-ratings"
import {useQuery} from "@apollo/client";
import {GET_USER_TENANCIES} from "../../graphql/queries";

const TenantSection: FC = () => {
    const {data, loading} = useQuery(GET_USER_TENANCIES)
  return (
      loading ? (<p className={'w-full flex justify-center items-center text-center py-12'}>Loading</p>) : (
          !data?.getUserTenancies?.length ? (<p className={'w-full flex justify-center items-center text-center py-12'}>No Data</p>) :
              (
                 data.getUserTenancies.map((tenancy: any, index:number) => (
                     <div key={index} className={'pb-3 mb-4 border-b-2 border-b-gray-300'}>
                         <div className={'w-full flex flex-col p-5 mb-4 rounded-xl bg-gradient-to-t from-[#CFD9DF] to-[#E2EBF0]'}>
                             <p className={'w-full items-center text-center py-4 text-xl font-semibold'}>Account Holder</p>
                             <div className={'w-full flex justify-between items-start my-4'}>
                                 <div className={'flex-grow md:w-2/3 md:px-12 capitalize'}>
                                     <div className={''}>
                                         <div className={'text-2xl mb-2'}>{ tenancy?.name }</div>
                                         <div className={'text-xl'}>{tenancy?.apartmentType}</div>
                                         <div className={'text-sm'}>{tenancy?.address}</div>
                                         <div className={'text-sm'}>{tenancy?.phone}</div>
                                     </div>
                                     <div className={'mt-3'}>
                                         <div className={'text-xs'}>Rent -<span className={'text-xl font-bold'}>₦{"200,000"}</span></div>
                                         <div className={'text-xs'}>Next Payment Due in - </div>
                                     </div>
                                 </div>
                                 <div className={'w-2/12'}>
                                     <CircularProgressbar
                                         value={.54}
                                         maxValue={1}
                                         text={`July ‘21 - Aug ‘22`}
                                         counterClockwise={true}
                                         strokeWidth={10}
                                         styles={buildStyles({
                                             pathColor: '#57C293',
                                             trailColor: '#ED852F',
                                             textSize: 7,

                                         })}
                                     />
                                 </div>
                             </div>

                         </div>
                         <div className={'w-full flex flex-col p-5 mb-4 rounded-xl bg-gradient-to-t from-[#000000] to-[#000000]'}>
                             <div className={'flex-grow md:w-2/3 md:px-12 capitalize'}>
                                 <div className={'text-white captialize'}>
                                     <div className={'text-2xl mb-2 border-b border-b-white'}>Landlord/Agent Information</div>
                                     <div className={'text-xl'}>{tenancy?.property?.user?.name}</div>
                                     <div className={'text-sm'}>{tenancy?.property?.user?.address}</div>
                                     <div className={'text-sm'}>{tenancy?.property?.user?.phone}</div>
                                 </div>
                                 <div className={'mt-3 flex'}>
                                     <StarRatings
                                         rating={3.4}
                                         starRatedColor="#D9D9D9"
                                         numberOfStars={5}
                                         name='rating'
                                         starDimension={'20'}
                                     />
                                 </div>
                             </div>
                         </div>
                     </div>
                 ))
              )
      )
  )
}

export default TenantSection
