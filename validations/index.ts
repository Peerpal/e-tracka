import * as Yup from 'yup';
import * as moment from 'moment';


export const signupValidation = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password must not exceed 12 characters'),

    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});



export const loginValidation = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),


    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password must not exceed 12 characters'),

});

export const createProfileValidation = Yup.object().shape({
    name: Yup.string()
        .required('Full Name is required'),


    dateOfBirth: Yup.string()
        .required('Date of birth is required'),

       sex: Yup.string()
        .required('Gender is required'),

    phone: Yup.string()
        .required('Phone number is required'),

    address: Yup.string()
        .required('Address is required'),
avatar: Yup.mixed().required('Upload an image to continue')

});

export const accountTypeCreateValidation = Yup.object().shape({
    type: Yup.string()
        .required('Account type is required'),

});

export const newPropertyValidation = Yup.object().shape({
    description: Yup.string()
        .required('Description type is required'),
    title: Yup.string()
        .required('Title type is required'),

    addressLine1: Yup.string()
        .required('AddressLine1 type is required'),

    addressLine2: Yup.string()
        .required('AddressLine2 type is required'),

    state: Yup.string()
        .required('state type is required'),
    // images: Yup.mixed().required("properties images are required")
});

export const profileVerificationValidation = Yup.object().shape({
    type: Yup.string()
        .required('Full Name is required'),

    number: Yup.string()
        .required('Date of birth is required'),
});

export const addTenantValidation = Yup.object().shape({
    name: Yup.string()
        .required('Full Name is required'),

    email: Yup.string()
        .email("Enter a valid Email")
        .required('Email address is required'),

    phone: Yup.string()
        .required('Phone number is required'),

    rent: Yup.string()
        .required('Rent is required'),

    amountPaid: Yup.string()
        .required('Amount paid is required'),

    from: Yup.string()
        .required('From is required'),
to: Yup.string()
        .required('To is required'),

    property: Yup.mixed()
        .required('Property number is required'),

    apartmentType: Yup.string()
        .required('Apartment type number is required'),
    apartmentNumber: Yup.string()
        .required('Apartment number number is required'),

    nextOfKin: Yup.string()
        .required('Next of kin number is required'),

    nextOfKinAddress: Yup.string()
        .required('Next of kin address is required'),

    nextOfKinPhone: Yup.string()
        .required('Next of kin phone is required'),
});
