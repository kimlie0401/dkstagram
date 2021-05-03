export default function Loader() {
  return (
    <div
      className="flex justify-center p-5 space-x-1"
      style={{ animationDuration: "0.5s" }}
    >
      <div
        className="w-2 h-2 rounded-full bg-black-light animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-black-light animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-black-light animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-black-light animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-black-light animate-bounce"
        style={{ animationDelay: "0.5s" }}
      ></div>
    </div>
  );
}
