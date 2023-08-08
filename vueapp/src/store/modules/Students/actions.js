export default {
    async AllUsers(context ){
        const response = await fetch("https://localhost:7243/arid/auth/getallusers");
          const responseData = await response.json();
        
          if (!response.ok) {
            const error = new Error(responseData.message || "failed");
      
            throw error;
          }
          const allUsers =[];
           responseData.forEach(element => {
            allUsers.push(element);       
           });

            context.commit("setAllUsers",allUsers);
        },












        async UpdateUser(context,payload){


        
         
          // const headers = {
            
          //   'Content-Type': 'application/json'
          // };
    
          const response = await fetch(`https://localhost:7243/arid/auth/updateuser`,
          {
            method:'POST',  
            // headers,
            body: payload
          });
          // const responseData = await response.json();
          
          // console.log(JSON.stringify(payload));
          if(!response.ok){
            // const err = new Error(responseData.message|| 'failed ');
            console.log( response);
          }
          context.dispatch("AllUsers");
          console.log(response);
        },
};
