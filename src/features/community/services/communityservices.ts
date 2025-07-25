import Client from '../../../api/index';


export const getAllCommunities = async (params:any) => {
  try {
    const response = await Client.Instructor.community.get(params);
    console.log('groups',response);
    return response; 
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error; 
  }
};


export const getMessage = async (params:any) => {
  try {
    const response = await Client.Instructor.community.get_messages(params);
    return response;
  } catch (error) {
    console.error("Message send error:", error);
    throw error;
  }
};

