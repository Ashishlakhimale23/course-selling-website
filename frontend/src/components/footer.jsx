function Footer() {
  return (
    <footer className="pr-6 pl-6 ">
      <div className="container mx-auto py-8 flex flex-col md:flex-row justify-center items-center mt-2">
        <div className="text-xl font-bold flex items-center sm:w-full md:w-1/2 mb-4 md:mb-0">
          <span>Get</span>
          <span className="text-orange-600">better</span>
          <span className="text-gray-400">*</span>
        </div>
        
        <div className="flex flex-col items-center md:flex-row md:flex-wrap justify-center md:justify-between w-full">
          <div className="flex flex-col flex-1 p-2 md:p-4">
            <span className="text-xl font-semibold mb-2">Resources</span>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>
          <div className="flex flex-col flex-1 p-2 md:p-4">
            <span className="text-xl font-semibold mb-2">Follow us</span>
            <ul>
              <li><a href="#">Github</a></li>
              <li><a href="#">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
