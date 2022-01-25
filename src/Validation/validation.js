const validation=(values)=>{
   let errors={};

   if(!values.Name){
       errors.Name="Name is required"
   }
   if(!values.Email){
       errors.email="Email is required"
   }else if(!/\S+@\S+\.\S+/.test(values.Email)){
       errors.Email="Email is invalid"
   }

   return errors;

}

export default validation;