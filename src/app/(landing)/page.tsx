export default function Home() {
  return (
    <div className="flex flex-col items-center relative justify-center w-full h-screen">
      <div
        className="w-full h-full flex flex-col items-center justify-center text-light "
        style={{
          backgroundImage: `linear-gradient(to right, #06070833, #00000033), url('/images/Me.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="w-full max-w-7xl h-full py-18 flex flex-col gap-5 justify-center">
          <h1 className="text-7xl font-medium font-oxygen max-w-sm">
            {"Construindo experiências digitais de outro nível"}
          </h1>
          <p className="">
            {
              "Participe da jornada e experiências que unem design e código, onde cada detalhe transmite inovação e inspiração."
            }
          </p>
          <button>hi</button>
        </div>
      </div>
    </div>
  );
}
