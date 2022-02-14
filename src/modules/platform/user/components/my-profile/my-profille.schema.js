import { string, object, ref, number } from "yup";
import XRegExp from "xregexp";
import * as Yup from "yup";
import PhoneNumber from "awesome-phonenumber";
import { array } from "yup";

const PHONE_MAX_LENGTH = 25;

const isPhoneMaxLengthValid = (parent) => {
    const { country_callingCode, phone } = parent;
    if (!phone || !country_callingCode) return true;
    const phonenumberWithCountryCode = phone;
    return phonenumberWithCountryCode.length <= PHONE_MAX_LENGTH;
};

const isPhoneNumberValid = (parent) => {
    const { country_code, phone } = parent;
    if (!phone) return true;
    const pn = PhoneNumber(phone, country_code);
    if (pn.a.number.e164 !== pn.a.number.input) return false;
    return pn.isValid();
};

function validatePassword(password) {
    const minLength = 8;
    const maxLength = 50;
    const containsUppercase = new RegExp("^(?=.*[A-Z])").test(password);
    const containsLowercase = new RegExp("^(?=.*[a-z])").test(password);
    const containsDigit = new RegExp("^(?=.*[0-9])").test(password);
    const containsSpecialCharacter = new RegExp(
        "[!\"#$%&'()*+,-.\\\\/:;<=>?@[\\]^_`{|}~]"
    ).test(password);

    if (
        password &&
        (password.length < minLength ||
            password.length > maxLength ||
            !containsUppercase ||
            !containsLowercase ||
            !containsDigit ||
            !containsSpecialCharacter)
    ) {
        return false;
    }

    return true;
}

function hasValidCharacters(password) {
    var validCharacterPattern = new RegExp(
        "^[a-zA-Z0-9!\"#$%&'()*+,-.\\\\/:;<=>?@[\\]^_`{|}~]*$"
    );
    const containsValidCharacter = validCharacterPattern.test(password);
    return containsValidCharacter;
}

function isEmailLengthValid(email) {
    if (!email) return false;
    const parts = email.split("@");
    const local = parts[0];
    return local.length <= 64;
}

const userSchema = {
    first_name: string()
        .matches(
            XRegExp("^[\\pL.]+(?:\\s[\\pL]+)*$"),
            "This field should contain letters only"
        )
        .min(2, "This field must be at least 2 characters long")
        .max(50, "This field must be at most 50 characters long")
        .required("This field must not be empty"),
    last_name: string()
        .matches(
            XRegExp("^[\\pL.]+(?:\\s[\\pL]+)*$"),
            "This field should contain letters only"
        )
        .min(2, "This field must be at least 2 characters long")
        .max(50, "This field must be at most 50 characters long")
        .required("This field must not be empty"),
    email: string()
        .email("This field should be a valid email address")
        .max(100, "This field must be at most 100 characters long")
        .required("This field must not be empty")
        .test(
            "is-valid-email-length",
            "The part before @ of the email can be maximum 64 characters ",
            (email) => isEmailLengthValid(email)
        ),
};

export const updateMyProfileSchema = object().shape({
    id: number(),
    first_name: userSchema.first_name,
    last_name: userSchema.last_name,
    email: userSchema.email,
    phone: string()
        .nullable()
        .matches(/^[0-9\+]*$/, "This field only contains digits"),
        // .test(
        //     "is-phoneNumber-valid",
        //     `This field must contain a valid phone number`,
        //     // function () {
        //     //     return isPhoneNumberValid(this.parent);
        //     // }
        // ),
    role_id: array(),
});

