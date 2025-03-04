import ProductListSection from "../../src/components/products/ProductListSection";
import Header from "../../src/components/Header";
import FooterContact from "../../src/components/FooterContact";

export default function Page (){
    return(
        <div>
            <Header />
            <ProductListSection categoria={null} /> {/* Lista todos los productos si no hay categoría */}
            <FooterContact />
        </div>
    )
}