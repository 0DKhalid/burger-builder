export const updateObject = (oldState, objectProperties) => {
    return {
        ...oldState,
        ...objectProperties
    }
}


export const checkValidity = (value, rule) => {
    let isValid = true;
    if (!rule) {
        return true;
    }

    if (rule.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rule.isEmail) {
        const pattren = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        isValid = pattren.test(value) && isValid;
    }
    if (rule.passwordStrength) {
        const pattren = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        isValid = pattren.test(value) && isValid;
    }
    if (rule.minLength) {
        isValid = value.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
        isValid = value.length >= rule.minLength && isValid;
    }
    return isValid;
}