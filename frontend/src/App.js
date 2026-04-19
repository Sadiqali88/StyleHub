import React, { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [showAuth, setShowAuth] = useState(false);
  

const [user, setUser] = useState(null);
const [role, setRole] = useState("");


const [designName, setDesignName] = useState("");
const [designImage, setDesignImage] = useState("");
const [designs, setDesigns] = useState([]);

const [cart, setCart] = useState([]);

const [orders, setOrders] = useState([]);


useEffect(() => {
  axios.get("http://localhost:5000/orders")
    .then(res => setOrders(res.data));
}, []);

useEffect(() => {
  axios.get("http://localhost:5000/orders")
    .then(res => setOrders(res.data));
}, []);

useEffect(() => {
  axios.get("http://localhost:5000/designs")
    .then(res => setDesigns(res.data));
}, []);

const addDesign = async () => {
  await axios.post("http://localhost:5000/add-design", {
    name: designName,
    image: designImage,
    designer: user.name
  });

  alert("Design Added");
  window.location.reload();
};





  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data));
  }, []);

  const signup = async () => {
  const res = await axios.post("http://localhost:5000/signup", {
    name,
    role
  });

  setUser(res.data);
};

const login = async () => {
  const res = await axios.post("http://localhost:5000/login", {
    name
  });

  setUser(res.data);
};

  const addProduct = async () => {
  await axios.post("http://localhost:5000/add-product", {
    name,
    price,
    image
  });

  alert("Product Added!");

  window.location.reload(); // refresh data
};

if (showAuth && !user) {
  return (
    <div style={{
      height: "100vh",
      background: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff"
    }}>
      <div style={{ width: "300px", textAlign: "center" }}>

        <h2>Signup</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <br />

<button 
  onClick={async () => {
    const res = await axios.post("http://localhost:5000/signup", {
      name,
      role
    });

    setUser(res.data);
    setShowAuth(false);
  }}
  style={{
    width: "100%",
    padding: "10px",
    background: "#ff9d5c",
    border: "none"
  }}
>
  Signup
</button>

<button 
  onClick={async () => {
    const res = await axios.post("http://localhost:5000/login", {
      name
    });

    setUser(res.data);
    setShowAuth(false);
  }}
  style={{
    width: "100%",
    padding: "10px",
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    marginTop: "10px"
  }}
>
  Login
</button>

        <br /><br />

        <button onClick={() => setShowAuth(false)}>
          Back
        </button>

      </div>
    </div>
  );
}

return (
  <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
    
    {/* NAVBAR */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  borderBottom: "1px solid #222"
}}>
  <h2 style={{ color: "#ff9d5c" }}>StyleHub</h2>

  <div style={{ display: "flex", gap: "20px" }}>
    <span>Shop</span>
    <span>Design Studio</span>
    <span>My Shop</span>
    <span>Print</span>
    <button 
  onClick={() => setShowAuth(true)}
  style={{
    padding: "6px 14px",
    background: "transparent",
    border: "1px solid #ff9d5c",
    color: "#ff9d5c",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Signup
</button>

  </div>
</div>

    {/* HERO SECTION */}
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "40px" }}>
        Design. Sell. <span style={{ color: "#ff9d5c" }}>Print.</span> Repeat.
      </h1>

      <p style={{ marginTop: "10px", color: "#aaa" }}>
        One platform for designers, sellers, buyers, and printers.
      </p>

      <div style={{ marginTop: "20px" }}>
        <button style={{
          padding: "10px 20px",
          marginRight: "10px",
          background: "#ff9d5c",
          border: "none",
          borderRadius: "5px"
        }}>
          Start Designing
        </button>

        <button style={{
          padding: "10px 20px",
          background: "transparent",
          border: "1px solid #fff",
          borderRadius: "5px",
          color: "#fff"
        }}>
          Find Printer
        </button>
      </div>
    </div>
  

{user && (
  <h3 style={{ textAlign: "center" }}>
    Welcome, {user.name} 👋
  </h3>
)}



{/* ROLES SECTION */}
<div style={{
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "40px"
}}>
  {["Buyer", "Designer", "Seller", "Printer"].map(r => (
    <div 
      key={r}
      onClick={() => {
        if (!user) {
          alert("Please signup first");
        } else {
          setRole(r);
        }
      }}
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "150px",
        textAlign: "center",
        border: "1px solid #333",
        cursor: "pointer"
      }}
    >
      <h3>{r}</h3>
      <p style={{ color: "#aaa", fontSize: "12px" }}>
        Explore as {r}
      </p>
    </div>
  ))}
</div>




{user && role === "Seller" && (
  <div style={{ textAlign: "center", margin: "40px" }}>
    <h2>Seller Dashboard</h2>

    <h3>Select a Design</h3>

    <div style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      {designs.map(d => (
        <div 
          key={d._id}
          onClick={() => {
            setImage(d.image);   // 👈 auto set product image
          }}
          style={{
            border: "2px solid #333",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          <img 
            src={d.image} 
            style={{ width: "120px", borderRadius: "10px" }}
          />
          <p>{d.name}</p>
        </div>
      ))}
    </div>

    <h3 style={{ marginTop: "30px" }}>Create Product</h3>

    <input 
      placeholder="Product Name"
      onChange={(e) => setName(e.target.value)}
    />
    <br /><br />

    <input 
      placeholder="Price"
      onChange={(e) => setPrice(e.target.value)}
    />
    <br /><br />

    <button onClick={addProduct}>
      List Product
    </button>
  </div>
)}





{user && role === "Designer" && (
  <div style={{ textAlign: "center", margin: "40px" }}>
    <h2>Designer Dashboard</h2>

    <input 
      placeholder="Design Name"
      onChange={(e) => setDesignName(e.target.value)}
    />
    <br /><br />

    <input 
      placeholder="Design Image URL"
      onChange={(e) => setDesignImage(e.target.value)}
    />
    <br /><br />

    <button onClick={addDesign}>
      Upload Design
    </button>

    <h3 style={{ marginTop: "30px" }}>My Designs</h3>

    <div style={{
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
      {designs.map(d => (
        <div key={d._id} style={{
          background: "#111",
          padding: "10px",
          borderRadius: "10px"
        }}>
          <img 
            src={d.image} 
            style={{ width: "150px", borderRadius: "10px" }}
          />
          <p>{d.name}</p>
        </div>
      ))}
    </div>

  </div>
)}



{user && role === "Printer" && (
  <div style={{ textAlign: "center" }}>
    <h2>Printer Dashboard</h2>

    {orders.map(o => (
      <div key={o._id} style={{ margin: "10px" }}>
        <p>Buyer: {o.buyer}</p>
        <p>Items: {o.items.length}</p>
        <p>Status: {o.status}</p>
      </div>
    ))}
  </div>
)}




{user && role === "Buyer" && (
  <h2>Buyer Dashboard (Browse products)</h2>
)}


{user && role === "Buyer" && (
  <div style={{ textAlign: "center", margin: "30px" }}>
    <h2>My Cart</h2>

    {cart.length === 0 ? (
      <p>No items in cart</p>
    ) : (
      cart.map((item, i) => (
        <p key={i}>{item.name} - ₹{item.price}</p>
      ))
    )}

        {cart.length > 0 && (
      <button 
        onClick={async () => {
          await axios.post("http://localhost:5000/order", {
            items: cart,
            buyer: user.name
          });

          alert("Order placed!");
          setCart([]);
        }}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#ff9d5c",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Place Order
      </button>
    )}
  </div>
)}






    {/* PRODUCTS */}
    <h1 style={{ textAlign: "center" }}>StyleHub</h1>

    <div style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "20px"
    }}>
{products.map(p => (
  <div key={p._id} style={{
    border: "1px solid #333",
    padding: "20px",
    borderRadius: "10px",
    width: "200px",
    background: "#111",
    transition: "0.3s"
  }}>

    <img 
      src="https://picsum.photos/200/150"
      alt=""
      style={{
         width: "100%",
         height: "150px",
         objectFit: "cover",
         marginBottom: "10px",
         borderRadius: "10px"
          }}
    />

    <h2>{p.name}</h2>
    <p>₹{p.price}</p>



<button 
  onClick={() => {
    setCart([...cart, p]);
    alert("Added to cart");
  }}
  style={{
    background: "#ff9d5c",
    border: "none",
    padding: "10px",
    borderRadius: "5px"
  }}
>
  Add to Cart
</button>



  </div>
))}
    </div>

  </div>
);
}

export default App;