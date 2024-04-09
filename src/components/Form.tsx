import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const zodSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z.number({ invalid_type_error: "Age is required" }).min(18, { message: "Age must be at least 18" }),
});

type FormData = z.infer<typeof zodSchema>;

const Form = () => {

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(zodSchema) });

	const onSubmit = (data: FieldValues) => console.log(data);
	

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input { ...register("name") } 
        id="name" type="text" className="form-control" />
      { errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
			<div className="md-3">
				<label htmlFor="age" className="form-label">Age</label>
				<input {...register("age", { valueAsNumber: true })} id="age" type="number" className="form-control" />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
			</div>
      <br />
			<button disabled={!isValid} className="btn btn-primary" type="submit">Submit</button>
		
    </form>
  );
};


// interface FormData {
//   name: string;
//   age: number;
// }
//
// const Form = () => {
//
// 	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
//
// 	const onSubmit = (data: FieldValues) => console.log(data);
//	
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">Name</label>
//         <input { ...register("name", { required: true, maxLength: 30, minLength: 3 }) } 
//         id="name" type="text" className="form-control" />
//       </div>
//       { errors.name?.type === "required" && <p className="text-danger">The name field is required.</p>}
//       { errors.name?.type === "minLength" && <p className="text-danger">The name must be at least 3 characters.</p>}
// 			<div className="md-3">
// 				<label htmlFor="age" className="form-label">Age</label>
// 				<input {...register("age")} id="age" type="number" className="form-control" />
// 			</div>
//       <br />
// 			<button className="btn btn-primary" type="submit">Submit</button>
		
//     </form>
//   );
// };


// const Form = () => {

// 	const [person, setPerson] = useState({
// 		name: "",
// 		age: ""
// 	});

// 	const handleSubmit = (e: FormEvent) => {
// 		e.preventDefault();
		
// 		console.log(person);
		
// 	}

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">Name</label>
//         <input value={person.name} onChange={(e) => setPerson({...person, name: e.target.value})} id="name" type="text" className="form-control" />
//       </div>
// 			<div className="md-3">
// 				<label htmlFor="age" className="form-label">Age</label>
// 				<input value={person.age} onChange={(e) => setPerson({...person, age: Number(e.target.value)})} id="age" type="number" className="form-control" />
// 			</div>
// 			<button className="btn btn-primary" type="submit">Submit</button>
		
//     </form>
//   );
// };


// const Form = () => {

// 	const nameRef = useRef<HTMLInputElement>(null);
// 	const ageRef = useRef<HTMLInputElement>(null);
// 	const person = {
// 		name: "",
// 		age: 0
// 	}

// 	const handleSubmit = (e: FormEvent) => {
// 		e.preventDefault();
// 		if (nameRef.current !== null) {
// 			person.name = nameRef.current?.value;
// 		}
// 		if (ageRef.current !== null) {
// 			// person.age = parseInt(ageRef.current?.value);
// 			person.age = Number(ageRef.current?.value);
// 		}
// 		console.log(person);
		
// 	}

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">Name</label>
//         <input ref={nameRef} id="name" type="text" className="form-control" />
//       </div>
// 			<div className="md-3">
// 				<label htmlFor="age" className="form-label">Age</label>
// 				<input ref={ageRef} id="age" type="number" className="form-control" />
// 			</div>
// 			<button className="btn btn-primary" type="submit">Submit</button>
		
//     </form>
//   );
// };

export default Form;
