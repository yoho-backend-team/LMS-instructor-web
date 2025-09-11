import Client from '../../../api/index'

export const getClassDetailsId = async(params: { course: string }) => {

    const response = await Client.Instructor.class.getWithId(params)
    if(response)
        return response;
}