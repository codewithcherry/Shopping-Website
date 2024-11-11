import axios from "axios";

export const removeUserAddress=async(addressId)=>{

    try{
        const token=localStorage.getItem('jwtToken')
        const result=await axios.post('http://localhost:3000/products/remove-userAddress',{addressId:addressId},{
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }
        })

        // console.log("successfully removed the address",result.data)
        return result.data
    }
    catch(err){
        // console.log('couldnt remove the address',err)
        throw err;
    }

} 