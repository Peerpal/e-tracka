import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Login($input: LoginInput) {
        login(input: $input) {
            access_token
            user {
                id
                email
                name
                emailVerifiedAt
                sex
                address
                phone
                createdAt
                updatedAt
                accountType {
                    id
                    name
                }
            }
        }
    }
`;

export const SOCIAL_AUTH = gql`
mutation SocialAuth($accessToken: String! $provider: String!) {
    socialLogin(input: {token: $accessToken provider: $provider}) {
        access_token
        user {
            id
            email
            name
            emailVerifiedAt
            sex
            address
            phone
            createdAt
            updatedAt
            accountType {
                id
                name
            }
        }
    }
}
`;

export const CREATE_USER = gql`
    mutation Login($input: NewUserInput) {
        createUser(input: $input) {
            id
            email
            name
            emailVerifiedAt
            sex
            address
            phone
            createdAt
            updatedAt
        }
    }
`;


export const SET_ACCOUNT_TYPE = gql`
    mutation SetAccountType($type: ACCOUNT_TYPE_ENUM!)  {
        setAccountType(type: $type) {
            id
            email
            name
            emailVerifiedAt
            sex
            address
            phone
            createdAt
            updatedAt
            accountType {
                id
                name
            }
        }
    }`;
export const CREATE_USER_PROFILE = gql`
    mutation CreateProfile($input: UpdateProfileInput) {
        updateProfile(input: $input) {
            id
            email
            name
            emailVerifiedAt
            sex
            address
            phone
            createdAt
            updatedAt
            accountType {
                id
                name
            }
        }

    }
`;

export const CREATE_USER_PROFILE_VERIFICATION = gql`
    mutation CreateProfile($type: String! $number: String!) {
        addDocument(type: $type number: $number)
    }
`;


export const CREATE_PROPERTY = gql`
    mutation CreateProperty($input: NewPropertyInput) {
        createProperty(input: $input) {
            id
            title
            description
            addressLine1
            addressLine2
            state
            medially {
                fileUrl
                fileName
                fileType
                size
            }
        }
    }
`;

export const CREATE_TENANCY = gql`
    mutation CreateTenancy($input: NewTenancyInput) {
        createTenancy(input: $input) {
            id
        }
    }
`;

export const CREATE_INVOICE = gql`
    mutation CreateInvoice($input: NewInvoiceInput) {
        createInvoice(input: $input) {
            id
            name
            email
            dateOfBirth
            phone
            address
            description
            amount
            dueDate
        }
    }
`;


export const SEND_INVOICE = gql`
    mutation SendInvoice($id: ID!) {
        sendInvoice(id: $id)
    }
`;


export const UPDATE_ACCOUNT = gql`
    mutation UpdateAccountInfo($id: ID! $name: String! $dateOfBirth: String! $phone: String! $address: String!) {
        updateAccountInfo(id: $id name: $name dateOfBirth: $dateOfBirth phone: $phone address: $address) {
            id
            email
            name
            emailVerifiedAt
            sex
            address
            phone
            createdAt
            updatedAt
        }
    }
`;


export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($id: ID! $oldPassword: String $newPassword: String! $confirmPassword: String!) {
        changePassword(id: $id oldPassword: $oldPassword newPassword: $newPassword confirmPassword: $confirmPassword)
    }
`;


export const CREATE_POST = gql`
    mutation CreatePost($userId: ID! $title: String!) {
        createPost(userId: $userId title: $title) {
            id
            title
            user {
                id
                name
                address
                phone
            }
            createdAt
            updatedAt
        }
    }
`;
export const CREATE_COMMENT = gql`
    mutation CreateComment($userId: ID! $postId: ID! $body: String!) {
        createComment(userId: $userId postId: $postId body: $body) {
            id
            body
            user {
                id
                name
                address
                phone
            }
            createdAt
            updatedAt
        }
    }
`;


export const CREATE_THREAD = gql`
mutation CreateConversation($user: ID! $participant: ID!) {
    createConversation(user: $user participant: $participant) {
        id
        subject
        participants {
            id
            user {
                id
                name
            }
        }
    }
}
`;


export const SEND_MESSAGE = gql`
mutation SendMessage($userId: ID! $threadId: ID! $body: String) {
    sendMessage(user_id: $userId thread_id: $threadId body: $body) {
        id
        body
        user {
            id
            name
        }
    }
}

`;


export const SEND_NOTIFICATION = gql`
mutation SendNotification($id: ID! $title: String! $message: String) {
    sendNotification(id: $id title: $title message: $message)
}
`;


export const SEND_RECEIPT = gql`
mutation SendReceipt($input: SendReceiptInput) {
    sendReceipt(input: $input)
}
`;

export const CHANGE_AVATAR = gql`
mutation ChangeAvatar($image: Upload!) {
    changeAvatar(image: $image) {
        id
        email
        name
        emailVerifiedAt
        sex
        address
        phone
        createdAt
        updatedAt
        accountType {
            id
            name
        }
    }
}
`;
