import Client from '../schemas/client.schema.js';

export const getClients= async () => {
    return await
    Client.find().sort({name:1})
};

export const createClient =async (clientData) => {
    const exist=await Client.findOne({name:clientData.name});
    if (exist){
        throw Error ('Ya existe un cliente con ese nombre');
    }

    const newClient= new Client(clientData);
    return await newClient.save();
};

export const updateClient = async (id,clientData)=>{
    const exists=await Client.findOne({name:clientData.name,_id:{$ne:id}});
    if (exists) throw Error('Ya existe otro cliente con ese nombre');
    return await Client.findByIdAndUpdate(id,clientData,{new:true});
};

export const deleteClient=async (id) => {
    return await
    Client.findByIdAndDelete (id);
};

export default{getClients,createClient,updateClient,deleteClient};




