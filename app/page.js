import { Header } from "./components/Header";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header />
      <Image src={"https://acdn.mitiendanube.com/stores/002/215/740/products/mockup-basica-negra-b989fa8f1daf238e2f17123227639037-1024-1024.jpg"} alt={"remera negra"} height={300} width={300} />
      <Image src={"/imageTea.png"} alt="UberElectronic" height={300} width={300} />
    </>
  );
}
