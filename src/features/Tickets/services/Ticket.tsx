import Client from '../../../api/index';

export const getticketdata = async (params: any) => {
	const response = await Client.Instructor.ticket.get(params);
	if (response) {
		return response;
	}
};

export const createticketdata = async (data: any, params: any) => {
	const response = await Client.Instructor.ticket.create(data, params);
	if (response) {
		return response;
	}
};

export const uploadticketfile = async (data: any) => {
	const response = await Client.common.file.upload(data);
	if (response) {
		return response;
	}
};

// export const getticketfile = async () =>{
//   const response = await Client.common.file.get()
//   if(response){
//     return response
//   }
// }
