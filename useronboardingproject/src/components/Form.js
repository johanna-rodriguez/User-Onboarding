import React, { useState,useEffect } from 'react';
import '../styles.css'
import formSchema from '../validations/formSchema'
import * as yup from 'yup'
import axios from 'axios';


function Form({teamMembers,setTeamMembers}) {


    const [users,setUsers] = useState([])
    const [form,setForm] = useState({ username:'', email:'',password:'',terms:false});
    const [errors,setErrors] = useState({ username:'', email:'',password:'',terms:''});
    const [disabled,setDisabled] = useState(true);
   
    const setFormErrors = (name, value)=>{
        yup.reach(formSchema,name).validate(value).then(()=>setErrors({...errors,[name]:''}))
        .catch(err => setErrors({...errors, [name]: err.errors[0] }))
    }

    const change = (event) =>{
      const {checked,value,name,type} = event.target
      const valueToUse = type === 'checkbox' ? checked : value
      setFormErrors(name,valueToUse)
      setForm({...form, [name]:valueToUse})

     }

     const submit = event =>{
        event.preventDefault()

        axios.post(`https://reqres.in/api/users`, form)
        .then(res=>{
            console.log(res.data)
            setUsers([...users,res.data])
        })
        .catch(err=>{
            console.log(err)

        })
        
     }

     useEffect(()=> {
        formSchema.isValid(form).then(valid => setDisabled(!valid))
     },[form])


  return (
<div className="center">
     <form onSubmit={submit} className="center" id='formId'>
        <div style={{color:'red'}}>
            <div>{errors.username}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.terms}</div>
        </div>
         <label>Name
            <input onChange={change} value={form.username} id='fusernameInput' placeholder='Name' name='username' type='text'></input>
         </label>

         <label>Email
            <input onChange={change} value={form.email} id='femailInput' placeholder='Email' name='email' type='text'></input>
         </label>

         <label>Password
            <input onChange={change} value={form.password} id='fpasswordInput' placeholder='Password' name='password' type='text'></input>
         </label>

         <label>Terms of Service
            <input onChange={change} checked={form.terms} id='ftermsInput'  name='terms' type='checkbox'></input>
         </label>

        <button id='fsubmitButton' disabled={disabled}>Submit</button>
     </form>
     
        <pre>
            {JSON.stringify(users,undefined, 2)}
        </pre>
     
     </div>
  );
}

export default Form;
