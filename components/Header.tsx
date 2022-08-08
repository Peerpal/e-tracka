import {FC} from "react";
import Link from "next/link";
import {useUser} from "../utils/store";
import {useQuery} from "@apollo/client";
import {ME_QUERY} from "../graphql/queries";

type Props = {
    className?: string
}
const Header: FC<Props> = ({ className}: Props) => {
    const {data, loading} = useQuery(ME_QUERY)
    let landlordLinks = [
        {
            name: 'Search Property',
            link: '/property'
        },
        {
            name: 'Check Tenant History',
            link: '/tenant/history'
        },
        {
            name: 'Reports For Tenants',
            link: '/tenant/manage'
        }, {
            name: 'Community',
            link: '/community'
        },
    ];

    let tenantLinks = [
        {
            name: 'Check Landlord History',
            link: '/account/landlords'
        }, {
            name: 'Community',
            link: '/community'
        },
    ];

    return (
        <nav className={`${className} px-10 py-4 flex items-center  bg-white sticky top-0 z-50`}>
            {
                data?.me?.accountType?.name === 'TENANT' ? tenantLinks.map((link: any, index:number) => (
                    <Link key={index} href={link.link}>
                        <a className={'text-sm rounded-full border border-gray-300 px-4 mr-4'}>
                            {link.name}
                        </a>
                    </Link>
                ) ) : landlordLinks.map((link: any, index:number) => (
                    <Link key={index} href={link.link}>
                        <a className={'text-sm rounded-full border border-gray-300 px-4 mr-4'}>
                            {link.name}
                        </a>
                    </Link>
                ))
            }
        </nav>
    )
}

export default Header
