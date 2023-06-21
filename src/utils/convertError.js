export const convertError = (arrayError) => {
    return arrayError.reduce((acc, cur) => ({ ...acc, [cur.propertyName]: cur.errorMessage }), {})
}