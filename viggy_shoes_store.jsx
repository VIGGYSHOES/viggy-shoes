import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, PlusCircle } from "lucide-react";

const defaultProducts = [
  {
    id: 1,
    name: "Tênis Esportivo VIGGY X1",
    price: 299.9,
    image: "https://via.placeholder.com/300x300?text=VIGGY+X1",
    description: "Ideal para treinos e corridas com máximo conforto e estabilidade."
  },
  {
    id: 2,
    name: "Tênis Casual VIGGY Street",
    price: 259.9,
    image: "https://via.placeholder.com/300x300?text=VIGGY+Street",
    description: "Estilo urbano para o dia a dia com leveza e sofisticação."
  },
  {
    id: 3,
    name: "Tênis Corrida VIGGY Run Pro",
    price: 349.9,
    image: "https://via.placeholder.com/300x300?text=VIGGY+Run+Pro",
    description: "Desempenho profissional com tecnologia de amortecimento avançada."
  },
];

export default function HomePage() {
  const [products, setProducts] = useState(defaultProducts);
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", description: "" });

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item, index) => index !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: parseFloat(newProduct.price)
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", price: "", image: "", description: "" });
  };

  const handleLogin = () => {
    if (loginForm.username === "admin" && loginForm.password === "1234") {
      setAdminLoggedIn(true);
      setLoginForm({ username: "", password: "" });
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  if (!adminLoggedIn) {
    return (
      <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Login de Administrador</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={loginForm.username}
          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <Button className="w-full" onClick={handleLogin}>Entrar</Button>
      </div>
    );
  }

  if (checkout) {
    return (
      <div className="p-6 text-center min-h-screen flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">Pagamento</h1>
        <p className="text-lg text-gray-700 mb-6">
          Total a pagar: <strong>R${total.toFixed(2)}</strong>
        </p>
        <a
          href="https://www.mercadopago.com.br/checkout"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mb-4">Pagar com Mercado Pago (Simulado)</Button>
        </a>
        <p className="text-sm text-gray-500">Este é um ambiente de testes. Nenhum pagamento real será processado.</p>
      </div>
    );
  }

  if (adminView) {
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Painel Administrativo - Adicionar Produto</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nome"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Preço"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Imagem (URL)"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleAddProduct}>
            <PlusCircle size={18} className="mr-2" /> Adicionar Produto
          </Button>
          <Button variant="outline" onClick={() => setAdminView(false)}>Voltar à Loja</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-center sm:text-left">Viggy Shoes</h1>
        <Button variant="outline" onClick={() => setAdminView(true)}>Admin</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {products.map((product) => (
          <Card key={product.id} className="rounded-2xl shadow-md flex flex-col">
            <img src={product.image} alt={product.name} className="rounded-t-2xl object-cover w-full h-64" />
            <CardContent className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2 flex-1">{product.description}</p>
              <p className="text-lg text-gray-700">R${product.price.toFixed(2)}</p>
              <Button
                className="mt-4 w-full flex items-center justify-center gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={18} /> Comprar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">🛒 Carrinho de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.name} - R${item.price.toFixed(2)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromCart(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <div className="font-semibold text-lg text-right">
              Total: R${total.toFixed(2)}
            </div>
            <Button className="w-full" onClick={handleCheckout}>Finalizar Compra</Button>
          </div>
        )}
      </div>
    </div>
  );
}
