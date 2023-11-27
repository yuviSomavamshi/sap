import LogoRenderer from "./LogoRenderer";

function Brand({ showTitle, product }) {
  return (
    <div className="py-3 inline-flex items-center">
      <LogoRenderer className="m-1 h-5 w-5" name={product.name} />
      {showTitle && (
        <div className="cursor-pointer tracking-normal font-normal flex flex-col items-center justify-center">
          <label className="px-2 lg:tracking-wider text-md">{product.name}</label>
        </div>
      )}
    </div>
  );
}

export default Brand;
