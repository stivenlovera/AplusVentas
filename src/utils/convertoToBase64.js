export const fileGetBase64 = async (event) => {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        //me.modelvalue = reader.result;
        console.log(reader.result);
        me = reader.result
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    return me
}
export const readUploadedFileAsText = (event) => {
    let inputFile = event.target.files[0];
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsDataURL(inputFile);
    });
};