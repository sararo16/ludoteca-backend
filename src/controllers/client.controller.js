import * as ClientService from '../services/client.service.js';

export const getClients=async(req,res) =>{
    const client=await ClientService.getClients();
    res.status(200).json(client);
};

export const createClient =async (req,res)=>{
    try{
        const Client =await ClientService.createClient(req.body);
        res.status(200).json(Client);
    }catch (err){
        res.status(400).json({msg:err.toString()});
    }
};

export const updateClient =async (req,res)=>{
    try{
        const Client = await ClientService.updateClient(req.params.id,req.body);
        res.status(200).json(Client);
    }catch (err){
        res.status(400).json({msg:err.toString()});
    }
};

export const deleteClient=async (req,res)=> {
    await ClientService.deleteClient(req.params.id);
    res.status(200).json(1);
};