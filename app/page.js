import { Header } from "./components/Header";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header />
      <Image src={"/imageTea.png"} alt="UberElectronic" height={300} width={300}  />
    </>
  );
}
