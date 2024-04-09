import { useEffect, useRef, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup/ListGroup";
import { BsFillCalendarFill } from "react-icons/bs";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import { set } from "immer/dist/internal";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
import ProductList from "./components/ProductList";
import { CanceledError, AxiosError } from "./services/apiClient";
import userService, { User } from "./services/userService";
import useUsers from "./hooks/useUsers";





function App() {

  const { users, error, isLoading, setUsers, setError } = useUsers();
  

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       // get returns a promise, when resolved, we get the data otherwise we get the error
  //       const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  //       setUsers(res.data);
  //     } catch (err) {
  //       setError((err as AxiosError).message);
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  const deleteUser = async (id: number) => {
    const originalUsers = users;
    setUsers(users.filter(user => user.id !== id));
    await userService.delete(id)
      .catch((err) => {
        setUsers(originalUsers);
        setError((err as AxiosError).message);
      })
  }

  const addUser = async () => {
    const originalUsers = users;
    const newUser = { id: 0, name: "David Mark" };
    setUsers([newUser, ...users]);
    await userService.create(newUser)
      .then(({data: savedUser}) => setUsers([savedUser, ...users]))
      .catch((err) => { setUsers(originalUsers); setError((err as AxiosError).message); }) ;

  }

  const updateUser = async (user: User) => {
    const originalUsers = users;
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    await userService.update(updatedUser)
      .catch((err) => { setUsers(originalUsers); setError((err as AxiosError).message); })
  }

  return<>
    {error && <p className="text-danger">{error}</p>}
    {isLoading && <div className="spinner-border"></div>}
    <button className="btn btn-primary mb3" onClick={addUser}>Add</button>
    <ul className="list-group">
      {users.map(user => 
        <li className="list-group-item d-flex justify-content-between" key={user.id}>{user.name} 
        <div>
          <button className="btn btn-outline-secondary mx-2" onClick={() => updateUser(user)}>Update</button>
          <button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
        </li>
      )}
    </ul>
  </>;
}

/* 
const connect = () => console.log("connected");
const disconnect = () => console.log("disconnected");

function App() {

  useEffect(() => {
    connect();
    return () => disconnect();
  })

  return (
    <div>

    </div>
  );
} */

/* function App() {

  const [category, setCategory] = useState("");

  return (
    <div>
      <select name="" id="" className="form-select" onChange={(e) => setCategory(e.target.value)}>
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="HouseHold">HouseHold</option>
      </select>
      <ProductList category={category} />
    </div>
  );
} */
/* 
function App() {

  const inputRef = useRef<HTMLInputElement>(null);

  // call after render
  useEffect(() => {
    // Side effects
    if (inputRef.current) inputRef.current.focus();
  });

  useEffect(() => {
    document.title = "My App";
  })

  return (
    <div>
      <input ref={inputRef} type="text" className="form-control" />
    </div>
  );
} */

// function App() {

//   const [selectedCategory, setSelectedCategory] = useState("");

//   const [expenses, setExpenses] = useState([
//     { id: 1, description: "Food", amount: 100, category: "Food" },
//     { id: 2, description: "Clothing", amount: 200, category: "Clothing" },
//     { id: 3, description: "Entertainment", amount: 300, category: "Entertainment"},
//     { id: 4, description: "Personal", amount: 400, category: "Personal" },
//     { id: 5, description: "Health", amount: 500, category: "Health" },
//     { id: 6, description: "Other", amount: 600, category: "Other" },
//   ]);

//   const visibleExpenses = selectedCategory ? expenses.filter(expense => expense.category === selectedCategory) : expenses;

//   return (
//     <div>
//       <div className="mb-3">
//         <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])} />
//       </div>
//       <div className="mb-3">
//         <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)} />
//       </div>
//       <ExpenseList
//         expenses={visibleExpenses}
//         onDeleteExpense={(id) =>
//           setExpenses(expenses.filter((expense) => expense.id !== id))
//         }
//       />
//     </div>
//   );
// }

// function App() {

//   return (<div>
//     <Form />
//   </div>);

// }

// function App() {

//   return (<div>
//     <ExpandableText maxChars={15}>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sunt at totam expedita quam amet ab quidem iusto doloribus repellat vitae ipsa ipsum aperiam, accusamus unde explicabo quos pariatur. Illum perspiciatis vero impedit. Inventore veniam nisi exercitationem sequi deleniti voluptatem ratione veritatis eaque recusandae incidunt. Ullam dignissimos vero labore ipsa sapiente fuga esse. Quasi rerum nostrum nesciunt quaerat, temporibus minus expedita blanditiis id optio inventore aspernatur esse molestias porro, quas amet suscipit error repellendus ipsum ipsa, eum corporis maiores quisquam! Reiciendis earum officiis praesentium delectus atque quidem repellendus excepturi, possimus aut veniam. Praesentium eos perspiciatis suscipit minima! Dolorum, magnam? Laboriosam.
//     </ExpandableText>
//   </div>);

// }

// function App() {

//   const [cart, setCart] = useState({
//     discount: .1,
//     items: [
//       { id:1, name: "Product1", quantity: 1 },
//       { id:2, name: "Product2", quantity: 1 },
//     ],
//   })

//   const handleClick = () => {
//     setCart({ ...cart, items: cart.items.map(item => item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item) });
//   }

//   // const [pizza, setPizza] = useState({
//   //   id: 1,
//   //   name: "Margherita",
//   //   price: 10,
//   //   toppings: ["Tomato", "Cheese", "Mushroom"],
//   // })

//   // const handleClick = () => {
//   //   setPizza({ ...pizza, toppings: [...pizza.toppings, "Olives"] });
//   // }

//   // const [game, setGame] = useState({
//   //   id: 1,
//   //   player: {
//   //     name: "John"
//   //   },
//   // });

//   // const handleClick = () => {
//   //   setGame({ ...game, player: { ...game.player, name: "Jane" } });
//   // }

//   return (<div>

//   </div>);

// }

// function App() {
//   const [cartItems, setCartItems] = useState(["Product1", "Product2", "Product3"]);

//   return (<div>

//     <NavBar cartItemsCount={cartItems.length} />
//     <Cart cartItems={cartItems} onclearCart={() => setCartItems([])} />
//     {/* <Button colorName="success" onClick={() => setCartItems([])}>Clear cart</Button> */}

//   </div>);

// }

// function App() {
//   const [showAlert, setShowAlert] = useState(false);

//   return (<div>
//     <BsFillCalendarFill color="red" size={100} />
//   </div>);

// }

// function App() {
//   const [showAlert, setShowAlert] = useState(false);

//   return <div>
//     {showAlert && <Alert onClose={() => setShowAlert(false)}>This is an alert.</Alert>}
//     <Button colorName="success" onClick={() => setShowAlert(true)}>Click me</Button>
//   </div>;
// }

// function App() {
//   return <div><Alert>Hello <span>World</span></Alert></div>;
// }

// function App() {
//   let items = ["Lagos", "Ogun", "Delta", "Jos", "Abuja"];
//   const handleSelectItem = (item: string) => console.log(item);
//   return <div><ListGroup items={items} heading="States in nigeria" onSelectItem={handleSelectItem} /></div>;
// }

export default App;
