import Link from "next/link";
export default function Layout({ children }) {
    return (
      <>
        <header className="absolute text-4xl font-black px-[20px] py-[10px]">
         <Link href={'/'}><h1>Classpro</h1></Link>
        </header>
        {children}
        
      </>
    );
  }
  