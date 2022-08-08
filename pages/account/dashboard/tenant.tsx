import {FC} from "react";
import DashboardLayout from "../../../components/Layouts/dashboard";
import Image from "next/image";
import Link from "next/link";
import TenantSection from "../../../components/Dashboard/TenantSection";


const TenantDashboard: FC = () => {
  return (
      <DashboardLayout>
          <div className={'flex-grow'}>
              <div className={'px-1 md:px-6'}>

                  <TenantSection/>
              </div>
          </div>
          <div className={'hidden md:block w-1/4'}>
              <div className={'w-full mb-4 bg-red-600 p-24'}  style={{width: '100%', height: '100%', position: 'relative'}}>
                  <Image className={'h-72 w-full'}  src={'/images/banner.jpg'} layout={'fill'}/>
              </div>
              <div className={'p-5 bg-gradient-to-r from-[#CFD9DF] to-[#E2EBF0] text-center rounded-xl mb-4'}>
                  <p className={'text-xl mb-3'}>
                      Do you need a rent loan?
                  </p>
                  <Link href={'#'}>
                      <a className={'text-xs text-center bg-primary border border-black px-4 py-1 rounded-md mt-3'}>
                          Apply
                      </a>
                  </Link>
              </div>
          </div>
      </DashboardLayout>
  );
}

export default TenantDashboard

