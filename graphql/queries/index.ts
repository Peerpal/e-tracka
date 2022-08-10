import {gql} from "@apollo/client";

export const ME_QUERY = gql`
query  {
    me {
        id
        name
        phone
        email
        emailVerifiedAt
        dateOfBirth
        sex
        phone
        address
        accountType {
            name
        }
        medially {
            fileUrl
            fileName
            fileType
        }
    }
}

`;export

const USER_QUERY = gql`
query User($id: ID!) {
    user(id: $id) {
        id
        name
        phone
        email
        emailVerifiedAt
        dateOfBirth
        sex
        phone
        address
        accountType {
            name
        }
        medially {
            fileUrl
            fileName
            fileType
        }
    }
}
`;
export const USER_PROPERTIES_QUERY = gql`
    query {
        properties {
            id
            title
            description
            addressLine1
            addressLine2
        }
    }
`;


export const GET_USER_TENANTS = gql`
    query {
        getUserTenants {
            id
            name
            email
            phone
            medially {
                fileUrl
            }
            property {
                id
                title
                description
                addressLine1
                addressLine2
                state
            }
            from
            to
            apartmentNumber
            apartmentType
            rent
            amountPaid
            amountOwed
            nextOfKinName
            nextOfKinPhone
            nextOfKinAddress
            createdAt
            updatedAt

        }
    }
`;


export const GET_USER_TENANCIES= gql`
    query {
        getUserTenancies {
            id
            name
            email
            phone
            medially {
                fileUrl
            }
            property {
                id
                title
                description
                addressLine1
                addressLine2
                state
                user {
                    name
                    phone
                    address
                }
            }
            from
            to
            apartmentNumber
            apartmentType
            rent
            amountPaid
            amountOwed
            nextOfKinName
            nextOfKinPhone
            nextOfKinAddress
            createdAt
            updatedAt

        }
    }
`;

export const GET_TENANT = gql`
query Tenant($id: ID!) {
    tenant(id: $id) {
        id
        name
        email
        phone
        medially {
            fileUrl
        }
        property {
            id
            title
            description
            addressLine1
            addressLine2
            state
        }
        from
        to
        apartmentNumber
        apartmentType
        rent
        amountPaid
        amountOwed
        nextOfKinName
        nextOfKinPhone
        nextOfKinAddress
        createdAt
        updatedAt

    }
}
`;
export const GET_TENANTS = gql`
query Tenants($term: String!) {
    searchTenants(term: $term) {
        id
        name
        email
        phone
        medially {
            fileUrl
        }
        property {
            id
            title
            description
            addressLine1
            addressLine2
            state
        }
        from
        to
        apartmentNumber
        apartmentType
        rent
        amountPaid
        amountOwed
        nextOfKinName
        nextOfKinPhone
        nextOfKinAddress
        createdAt
        updatedAt

    }
}
`;

export const GET_INVOICE = gql`
query GetInvoice($id: ID) {
    invoice(id: $id) {
        id
        name
        email
        dateOfBirth
        phone
        address
        description
        amount
        dueDate
        property {
            title
            description
            addressLine1
            addressLine2
        }
    }
}

`;

export const PROPERTIES = gql`
query GetProperties($type: String = "RENT") {
    getProperties(type: $type) {
        id
        title
        description
        addressLine1
        addressLine2
        state
        type
        amount
        toilets
        bedrooms
        medially {
            fileUrl
            fileName
            fileType
        }
    }
}
`;

export const GET_PROPERTY = gql`
query Property($id: ID!) {
    property(id: $id) {
        id
        title
        description
        addressLine1
        addressLine2
        state
        type
        amount
        toilets
        bedrooms
        medially {
            fileUrl
            fileName
            fileType
        }
        user {
            id
            phone
            name
        }
        medially {
            fileUrl
            fileName
            fileType
        }
    }
}
`;

export const GET_POSTS = gql`
query GetPosts {
    posts {
        id
        title
        user {
            id
            name
            address
            phone
            accountType {
                name
        }
            medially {
                fileUrl
                fileName
                fileType
            }
        createdAt
        updatedAt
    }
    }
}
`;

export const GET_POST_COMMENTS = gql`
    query GetPostComments($postId: ID! $limit: Int = 3) {
        comments(post_id: $postId limit: $limit) {
            id
            body
            user {
                id
                name
                address
                phone
                medially {
                    fileUrl
                    fileName
                    fileType
                }
            }
            createdAt
            updatedAt
            
        }
    }
`;

export const GET_USER_CONVERSATIONS = gql`
query {
    getUserConversations {
        id
        subject
        participants {
            id
            user {
                id
                name
            }
        }
        messages {
            id
            body
            user {
                id
                name
            }
            createdAt
            
        }
    }
}
`;
export const GET_CONVERSATION = gql`
query GetConversation($id: ID!) {
    getConversation(id: $id) {
        id
        subject
        participants {
            id
            user {
                id
                name
            }
        }
        messages {
            id
            body
            user {
                id
                name
            }
            createdAt
            
        }
    }
}
`;

export const SEARCH_LANDLORDS = gql`
    query SearchLandlords($term: String!) {
        searchLandlords(term: $term) {
            id
            name
            email
            phone
            address
            sex
            dateOfBirth
            createdAt
            updatedAt

        }
    }
`;


export const SEARCH_PROPERTY = gql`
query SearchProperty($price: [String!]! $state: String! $rooms: String) {
    searchProperty(price: $price state: $state rooms: $rooms) {
        id
        title
        description
        addressLine1
        addressLine2
        state
        type
        amount
        toilets
        bedrooms
        medially {
            fileUrl
            fileName
            fileType
        }
    }
}
`;
