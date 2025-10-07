import Client from '../../../api/index';

export const getStudentProfile = async () => {
    const response = await Client.Instructor.index.get();
    if (response) {
        return response;
    }
};


export const updateStudentProfile = async (data: any) => {
    const response = await Client.Instructor.index.update(data)
    if (response) {
        return response;
    }
}

export const getStaffIdCard = async (data: any) => {
    try{
           const response = await Client.staffIdCard.get(data)
           return response;
    }catch(error){
        console.log(error)
    } 
}