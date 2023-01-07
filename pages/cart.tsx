import Image from "next/image";
import shirt from "../src/assets/IMG_4060.jpg";

const Cart = () => {
  return (
    <main className="md:bg-[#ebeded] min-h-screen">
      <section className="flex flex-col md:flex-row justify-between w-11/12 mx-auto py-4 md:py-8 text-black text-base max-w-7xl">
        <aside className="md:order-1  md:bg-white md:px-2.5 md:py-4 mb-4 md:mb-0 border-b border-grey md:border-0 md:basis-3/12 md:self-start">
          <div>
            <p>
              Subtotal{" "}
              <span className="hidden md:inline">
                ({3}item{`s`})
              </span>
              : <span>$44.58</span>
            </p>
          </div>
          <button className="my-2 py-3 bg-yellow w-full rounded-md text-sm font-medium">
            Proceed to checkout{" "}
            <span className="inline md:hidden">
              ({3}item{`s`})
            </span>
          </button>
        </aside>
        <section className="md:basis-9/12 md:bg-white  md:mr-4 xs:p-4">
          <div className="hidden md:block">
            <h1 className="text-3xl font-medium">Shopping Cart</h1>
            <button className="font-medium text-bluish text-sm">
              Deselect all items
            </button>
            {/* <div>
          No items selected.<button>Select all items</button>
        </div> */}
          </div>
          <div className="hidden md:flex justify-end  border-b border-grey mb-4">
            <p className="text-sm">Price</p>
          </div>
          <ul>
            <li className="flex items-center mb-4 xs:bg-[#f8f9fa] md:bg-white xs:p-2 md:p-0 md:pb-2 rounded md:rounded-none  md:border-b border-grey">
              <input type="checkbox" className="mr-4" />
              <div className="flex flex-col xs:flex-row flex-grow">
                <div className="xs:mr-4 relative w-full xs:w-2/5 md:w-auto xs:flex-shrink">
                  <Image
                    src={shirt}
                    alt="shirt"
                    width="180"
                    height="180"
                    className="w-full"
                  />
                </div>
                <div className="xs:flex-grow">
                  <p className="mb-0.5 md:text-lg font-medium">
                    iPhone Charger USB-C, Anker 40W 2-Port PIQ 3.0, PowerPort
                    III Duo Type C Foldable Fast…
                  </p>
                  <p className="md:hidden mb-0.5 font-bold">$19.99</p>
                  <p className="text-xs text-successgreen mb-0.5">In stock</p>
                  <p className="text-sm">sold by ...</p>
                  <div>
                    <select className="mr-2">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                    <button className="text-bluish text-xs">Delete</button>
                  </div>
                </div>
              </div>
              <p className="self-start hidden md:block font-bold">$19.99</p>
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default Cart;
