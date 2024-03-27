// import React, { useState } from "react";

// //include images into your bundle


// //create your first component
// const Home = () => {

// 	const [username, setUsername] = useState('');
// 	const [list, setList] = useState([]);
// 	const [inputValue, setInputValue]= useState('')

// 	const handlerCreateList = async () => {
// 		try {
// 			let response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
// 				method: "POST",
// 				body: JSON.stringify([]),
// 				headers: {
// 					"content-type": "aplication/json"
// 				}
// 			})
// 			//validación 
// 			if (!response.ok) {
// 				throw new Error('Network error');
// 			}
// 			let newItem = { id: 1, text: inputValue }; // Solo agregamos un elemento con ID 1
//             setList([newItem]); // Reemplazamos la lista existente con el nuevo elemento
//             setInputValue(''); // Limpiamos el input

// 			let data = await response.jason()
// 			console.log(data);

// 		} catch (e) {
// 			console.error("el error es: ", e)
// 		};
// 	}
// 	const handlerShowList = async (e)=> {
// 		try {
// 			setUsername(e.target.value)
// 			let response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`);
// 			if (!response.ok) {
// 				throw new Error('new error')
// 			};
// 			let listTodos = await response.json()
// 			console.log(listTodos);
// 			setList(listTodos)
// 		} catch(e){
// 			console.error("the new error is: ",e);
// 		}
// 	}

// 	const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

// 	return (
// 		<div>
// 			<input type="text" onChange={handlerShowList} />
// 			<button onClick={handlerCreateList}>Crear Lista</button>
// 			<ul>
//                 {list.map(item => (
//                     <li key={item.id}>{item.text}</li>
//                 ))}
//             </ul>
// 		</div>
// 	)
// };

// export default Home;

import React, { useState } from "react";

//include images into your bundle


//create your first component
const Home = () => {

	const [username, setUsername] = useState('');
	const [list, setList] = useState([]);

	const handlerCreateList = async () => {
		try {
			let response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"content-type": "aplication/json"
				}
			})
			//validación 
			if (!response.ok) {
				throw new Error('Network error');
			}

			if (username.trim() !== '') { // Verifica que el valor no esté vacío
				const newItem = { id: + 1, text: username }; // da a cada elemento un id unico
				setList([...list, newItem]); // Agregar el nuevo elemento a la lista existente
				setUsername(''); // Limpiar el username
			};

			let data = await response.jason()
			console.log(data);

		} catch (e) {
			console.error("el error es: ", e)
		};
	}
	const handlerShowList = async (e)=> {
		try {
			setUsername(e.target.value)
			let response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`);
			if (!response.ok) {
				throw new Error('new error')
			};
			let listTodos = await response.json()
			console.log(listTodos);
			setList(listTodos)
		} catch(e){
			console.error("the new error is: ", e);
		}
	}

	return (
		<div>
			<input type="text" onChange={handlerShowList} />
			<button onClick={handlerCreateList}>Crear Lista</button>
			<ul>
                {list.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
		</div>
	)
};

export default Home;