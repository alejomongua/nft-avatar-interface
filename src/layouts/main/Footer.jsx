const Footer = () => {
  return (
    <div
      className="bg-gray-300 text-gray-500"
    >
      <div
        className="mx-auto my-4 container"
      >
        <p>
          © {new Date().getFullYear()} Original designs by
          <a className="mx-1" href="https://twitter.com/pablostanley">
            Pablo Stanley 🎨
          </a>
          - Programed by
          <a className="mx-1" href="https://github.com/alejomongua">
            Alejandro Mongua 🤓
          </a> in 2022
        </p>
      </div>
    </div>
  );
};

export default Footer;
