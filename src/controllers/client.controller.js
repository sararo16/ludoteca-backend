
//este archivo contiene todas las funciones que responden a las peticiones relaiconads con clientes
import * as ClientService from '../services/client.service.js';

    //devuelve la lista completa de clientes
    export const getClients=async(req,res) =>{
        try{
        const client=await ClientService.getClients();
        //llama al servicio
        res.status(200).json(client); //devuelve la lista
        }catch (err){
            res.status(400).json({msg:err.toString()});
        }
    };

    //Crea un nuevo cliente
    export const createClient =async (req,res)=>{
        try{
            const Client =await ClientService.createClient(req.body);
            //devuelve el cliente creado
            res.status(200).json(Client);
        }catch (err){
            res.status(400).json({msg:err.toString()});
        }
    };

    //actualiza un cliente existente
    export const updateClient =async (req,res)=>{
        try{
            const Client = await ClientService.updateClient(req.params.id,req.body);
            res.status(200).json(Client); //se devuelve el cliente actualizado
        }catch (err){
            res.status(400).json({msg:err.toString()});
        }
    };

    //elimina un cliente segun su id
    export const deleteClient=async (req,res)=> {
        await ClientService.deleteClient(req.params.id);
        res.status(200).json(1);
    };