import Client from '../../../api/index'

export const getClassDetailsId = async(params: { id: string }) => {

    const response = await Client.Instructor.class.getWithId(params)
    if(response)
        return response;
}