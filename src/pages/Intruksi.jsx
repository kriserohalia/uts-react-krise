import {Link} from "react-router-dom"
export default function Intruksi (){
    return (
        <main>
                <p>
                    tambah / buat produk dengan dialog : 
                    1. nama 
                    2. Harga
                    3. url gambar
                    4. kategori
                </p>
            
            <Link to="/">Kembali ke Beranda</Link>
        </main>
    )
}