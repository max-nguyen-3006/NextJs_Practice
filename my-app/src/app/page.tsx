import Image from "next/image";
// import { redirect } from "next/navigation";
import Link from "next/link";

//  const isAuth = false;
export default function Home() {
  // if (!isAuth) {
  //   redirect("/login");
  // }
  return (
    <main>
      <div className="w-[700px] h-[700px] bg-red-300">
        <Image
          src="/images/image_01.jpg"
          alt="image_01"
          width={700}
          height={700}
          quality={100}
          className="w-full h-full"
        />
        <Image
          src="https://images.pexels.com/photos/30994394/pexels-photo-30994394/free-photo-of-donkey-grazing-on-rocky-moroccan-hillside.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          alt="image_02"
          width={700}
          height={700}
          quality={100}
          className="w-full h-full"
        />
      </div>
    </main>
  );
}
