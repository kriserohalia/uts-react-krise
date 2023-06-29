import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import {GrAdd} from "react-icons/gr"
import {BsFillCartPlusFill} from "react-icons/bs"
import {MdDelete} from "react-icons/md"

export default function Beranda() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
    },
    {
      id: 3,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
    },
    {
      id: 4,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
    },
    {
      id: 5,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
    },
    {
      id: 6,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
    },
    {
      id: 7,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
    },
    {
      id: 8,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
    },
    {
      id: 9,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
    },
    {
      id: 10,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
    },
    {
      id: 11,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
    },
    {
      id: 12,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
    },
  ]);

  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState();
  const [idSequence,setIdSequence]=useState(products.length)
  const [addProduct, setAddProduct] = useState();
  const [sortCategory,setSortCategory]=useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredSortedProducts = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

  return (
    <div className="products">
          <header>
            <button onClick={()=> setAddProduct({id: idSequence})}><GrAdd/> Buat </button>
          <label>
              Cari:
              <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)} />
          </label>
          <section>
              Harga:
              <label>
                  Minimal:
                  <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)} />
              </label>
              <label>
                  Maksimal:
                  <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value || Infinity)} />
              </label>
          </section>
          <section>
              <label>Kategori :</label>
              <select>
                  <option>Semua</option>
                  <option>Jam </option>
                  <option>HP</option>
                  <option>Laptop</option>

              </select>
          </section>
          <section>
              Urutkan:
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="id">Normal</option>
                  <option value="name">Nama</option>
                  <option value="price">Harga</option>
              </select>
              <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
              >
                  <option value="asc">Naik</option>
                  <option value="desc">Turun</option>
              </select>
          </section>
          <button>
              <BsFillCartPlusFill />
          </button>
          <button onClick={()=> setIsCartOpen(true)}>
            Keranjang : {cart.reduce((a,p)=> a+p.count,0)}
          </button>

      </header>
      <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Tindaka</th>
            </tr>
        </thead>
        <tbody>
            {filteredSortedProducts.map((product)=>(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString()}</td>
                    <button onClick={()=> {
                        if (cart.find((p)=> p.id === product.id)){
                            setCart(
                                cart.map((p)=>
                                p.id === product.id ? {
                                    ...p,
                                    count: p.count + 1,
                                }
                                :p
                                )
                            );
                        }else {
                            setCart([...cart, {...product, count : 1}]);
                        }
                    }}
                    title="tambah ke keranjang"
                    >
                         <BsFillCartPlusFill />
                    </button>
                    <button onClick={()=> 
                    confirm (`apakah yakin ingin menghapus ?`) &&
                    setProducts(products.filter((p)=> p.id !== product.id))
                    }
                    title="Hapus"
                    >
                        <MdDelete />

                    </button>


                </tr>

            ))}
        </tbody>
      </table>
      <main>

              {filteredSortedProducts.length > 0
                  ? filteredSortedProducts
                      .filter((_product, i) => i >= 4 * page - 4 && i < 4 * page)
                      .map((product) => (
                          <Product
                              key={product.id}
                              {...product}
                              setEditedProduct={setEditedProduct} />
                      ))
                  : "Tidak ada produk ditemukan."}
          </main><footer>
            
              <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Sebelumnya
              </Button>
              {filteredSortedProducts
                  .filter((_product, i) => i % 4 === 0)
                  .map((_product, i) => (
                      <button
                          key={i}
                          className="page-number"
                          onClick={() => setPage(i + 1)}
                          disabled={i + 1 === page}
                      >
                          {i + 1}
                      </button>
                  ))}
              <Button
                  onClick={() => setPage(page + 1)}
                  disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
              >
                  Berikutnya
              </Button>
          </footer>
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
        
      )}
       {addProduct && (
        <form
          className="dialog"
            onSubmit={(e)=> {
                e.preventDefault();
                setProducts([...products,addProduct])
                setAddProduct();
                setIdSequence(idSequence + 1);
            }}
        >
          <h1>Tambah Produk</h1>
          <label>
            Nama
            <input
              type="text"
              onChange={(e) =>
                setAddProduct({ ...addProduct, name: e.target.value })
              }
              required
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              onChange={(e) =>
                setAddProduct({...addProduct,price:e.target.value})
              }
              required
            />
          </label>
          <label>
            Gambar
            <input
              type="text"
              onChange={(e) =>
                setAddProduct({...addProduct,image:e.target.value})
              }
              required
            />
          </label>
          <section>Kategori
          <select
        
                  value={sortCategory}
                  onChange={(e) => setSortCategory(e.target.value)}
              >
                  <option value="all">Semua</option>
                  <option value="hp">Handphone</option>
                  <option value="laptop">Laptop</option>

              </select>
              </section>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => setAddProduct()}>Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
        )}
    </div>
  );
}