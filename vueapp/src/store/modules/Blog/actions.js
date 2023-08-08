import Blog from ".";

export default {
  async AllBlogs(context ){
    const response = await fetch("https://localhost:7243/arid/blog");
      const responseData = await response.json();
    
      if (!response.ok) {
        const error = new Error(responseData.message || 'failed to get Blogs');
  
        throw error;
      }
      const Blogs =[];
       responseData.forEach(element => {
        Blogs.push(element);       
       });

        context.commit("SetAllBlogs",Blogs);
    },


    async AddBlog(_,paylaod ){
      const response = await fetch("https://localhost:7243/arid/blog",
      {
        method:'POST',
      
        body:paylaod
        // body:JSON.stringify(paylaod)
      },
    

      );
        
      
        if (!response.ok) {
          const error = 'failed to send data';
          throw error;
        }
       
      },
};
