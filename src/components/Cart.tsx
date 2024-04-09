import Button from "./Button/Button"

interface CartProps {
    cartItems: string[];
    onclearCart: () => void;
}


const Cart = ({cartItems, onclearCart}: CartProps) => {
  return (
    <> 
    <div>Cart</div>
    <ul>
       {cartItems.map((item) => <li key={item}>{item}</li>)}
    </ul>
    <Button colorName="success" onClick={onclearCart}>Clear cart</Button>
    </>
  )
}

export default Cart