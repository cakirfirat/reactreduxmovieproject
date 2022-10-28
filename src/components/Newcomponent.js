import { useState } from "react";

function Newcomponent() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const submitHandle = (e) => {
        e.preventDefault();
        setTodos([...todos, todo] );
    };
    const onChangeInput = (e) => {
        setTodo(e.target.value)
    }
    return (
        <>
            <h1>Todo App</h1>
            <form onSubmit={submitHandle}>
                <input
                    type="text"
                    name="text"
                    value={todo}
                    onChange={onChangeInput}
                />
                <button disabled={!todo} type="submit">
                    Ekle
                </button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </>
    );
}



export default Newcomponent;