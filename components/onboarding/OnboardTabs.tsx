import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import {useUser} from "../../utils/store";

type Props = {
    currentTab: string
}

interface TabInfo {
    id?: string
    name?: string
    link?: string
    activeIcon?: string
}

const OnboardTabs: FC<Props> = ({currentTab}: Props) => {
    const {user} = useUser()

    const tabs = [
        {
            id: 'personal',
            name: "Personal Information",
            link: "/account/setup",
            activeIcon: ""
        },
        user?.accountType?.name === 'LANDLORD' ? {
            id: 'property',
            name: "Property Information",
            link: "/account/setup/property",
            activeIcon: ""
        } : null,
        {
            id: 'verification',
            name: "Verification",
            link: "/account/setup/verification",
            activeIcon: ""
        },
    ];
    return <>
        <div className={'hidden md:flex items-center justify-between border-b border-b-1 border-b-primary-light'}>
            {
                tabs.filter(Boolean).map((tab: any) => (
                    <Link href={tab.link} key={tab.id}>
                        <a className={`border-b ${currentTab === tab.id ? 'border-b-2 border-b-orange-500' : ''} flex pb-1`}>
                            <Image src={currentTab === tab.id ? '/images/check.png' : '/images/ellipse.png'} height={23}
                                   width={23}/>
                            <span className={'ml-2'}>
                                {tab.name}
                            </span>
                        </a>
                    </Link>

                ))
            }
        </div>
    </>
}

export default OnboardTabs
