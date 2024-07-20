import Image from "next/image";
import SearchBarCarpool from "../carpool/SearchBarCarpool";

export default function Hero() {
  return (
    <div className="flex flex-col max-h-[700px]">
      <div className="max-h-[400px] overflow-hidden max-md:hidden relative">
        <Image
          height={0}
          width={0}
          style={{ width: "100%", height: "auto" }}
          className="lg:-translate-y-[400px] xl:-translate-y-[500px] -translate-y-[200px]"
          sizes="100vw"
          alt="heroImage"
          src={"/assets/hero.webp"}
        />
        <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-30"></div>
      </div>
      <div className="bg-blue-500 hidden max-md:block w-full h-[400px]"></div>
      <h2 className="font-bold text-4xl text-slate-50 text-center -translate-y-56">
        Trip ideas ? Book your carpool now.
      </h2>
      <div className="max-md:-translate-y-52 md:-translate-y-36 self-center">
        <SearchBarCarpool />
      </div>
    </div>
  );
}
