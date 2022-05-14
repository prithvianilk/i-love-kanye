import type { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <div className="h-screen w-full flex">
      <div
        className="bg-cover bg-no-repeat h-full w-1/2 relative flex justify-center items-center text-white text-3xl cursor-pointer"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100, 116, 139, 0.7), rgba(100, 116, 139, 0.7)), url('img/graduation.jpeg')",
        }}
      >
        Blood On The Leaves
      </div>
      <div
        className="bg-cover bg-no-repeat h-full w-1/2 relative flex justify-center items-center text-white text-3xl cursor-pointer"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100, 116, 139, 0.7), rgba(100, 116, 139, 0.7)), url('img/ye.jpeg')",
        }}
      >
        Barry Bonds
      </div>
    </div>
  );
};

export default Index;
