export default {


    async signUp(context, payload){

        const url = "https://localhost:7243/Arid/auth/register";
        const userData = {

            arName : payload.firstName,
            enName : payload.lastName,
            userName : payload.userName,
            email : payload.email,
            // role : payload.role,
            password : payload.password
        
        }

        const response = await fetch(url,{
            method:'POST',  
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(userData)
        });

        console.log(JSON.stringify(userData));
            // const responseData = awiat response.json()/;

            // const responseData = await response.json();
        if(!response.ok){
          
            // const error = new Error(responseData.message || "failed to sign up try agian please");
            // throw error;
            console.log(response);
        }
        console.log(response);
        

       

    },
    async logIn(context, payload){

        const url = "https://localhost:7243/Arid/auth/LogIn";
        const userData = {

         
            email : payload.email,

            password : payload.password
        
        }

        const response = await fetch(url,{
            method:'POST',  
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(userData)
        })

        const responseData = await response.json();

        if(!response.ok){
          const error = new Error(responseData.message || "failed to login try agian please");
            throw error;
            
        }
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('role', responseData.role);
        context.commit('setUser', {
            token: responseData.token,
            userId: responseData.userId,
            role:responseData.role 
          });
    
    },

    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
    
        if (token && userId) {
          context.commit('setUser', {
            token: token,
            userId: userId,
            role:role
          });
        }
      },

      logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
      
    
        
    
        context.commit('setUser', {
          token: null,
          userId: null,
          role:0
        });
      },

 
};
