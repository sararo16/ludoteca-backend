//Implementa la logica de negocio relacionada con clientes
import Client from '../schemas/client.schema.js';

//lista todos los clientes ordenados por nombre ascendente
export const getClients= async () => {
    return await Client.find().sort({name:1})
};

//crear cliente
export const createClient =async (clientData) => {
    const exist=await Client.findOne({name:clientData.name});
    if (exist){
        throw Error ('Ya existe un cliente con ese nombre');
    }

    //crea y guarda el nuevo cliente
    const newClient= new Client(clientData);
    return await newClient.save();
};
//actualiza y devuelve el docymento
export const updateClient = async (id,clientData)=>{
    const exists=await Client.findOne({name:clientData.name,_id:{$ne:id}});
    if (exists) throw Error('Ya existe otro cliente con ese nombre');
    return await Client.findByIdAndUpdate(id,clientData,{new:true});
};

//elimina cliente
export const deleteClient=async (id) => {
    return await Client.findByIdAndDelete (id);
};

//exporta por defecto con las funciones agrupadas
export default{getClients,createClient,updateClient,deleteClient};




