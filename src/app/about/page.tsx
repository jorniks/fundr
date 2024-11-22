
const About = () => {
  return (
    <main className="container py-40 grid items-start lg:grid-cols-2 gap-6 lg:gap-16">
      <section className='space-y-10'>
        {/* Introduction */}
        <aside className="space-y-3">
          <h2 className="">Fundr</h2>

          <article className="">
            Fundr is a revolutionary crowdfunding platform that connects creators, innovators, and change-makers with supporters worldwide. Whether you&apos;re an entrepreneur, artist, or social activist, Fundr gives you the tools you need to bring your ideas to life.
          </article>
        </aside>
        
        {/* Closing Statement */}
        <aside className="space-y-3">
          <h2 className="text-xl">Why Fundr?</h2>

          <article className="">
            Inspired by the Amharic parable,{" "} Fundr embodies the spirit of collective effort. We are here to make your journey to success lighter, impactful, and truly collaborative.
          </article>
        </aside>

        {/* Key Features */}
        <aside className="space-y-3">
          <h2 className="text-xl">Key Features:</h2>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-x-3">
              <i className="bi bi-check2-circle text-lime-400 text-2xl"></i>
              
              <article className="">
                <span className='text-white font-medium'>Effortless Campaign Management:</span> Launch and manage your campaign with intuitive tools and easy-to-use interfaces.
              </article>
            </li>

            <li className="flex items-start gap-x-3">
              <i className="bi bi-check2-circle text-lime-400 text-2xl"></i>
              
              <article className="">
                <span className='text-white font-medium'>Transparent and Secure Funding:</span> Built on blockchain technology, ensuring secure, transparent contributions and fund distribution.
              </article>
            </li>

            <li className="flex items-center gap-x-3">
              <i className="bi bi-check2-circle text-lime-400 text-2xl"></i>
              
              <article className="">
                <span className='text-white font-medium'>Real-time Insights and Analytics:</span> Track the progress of your campaign with real-time data, helping you make informed decisions.
              </article>
            </li>
          </ul>
        </aside>

        {/* Community Invitation */}
        <aside className="space-y-3">
          <h2 className="text-xl">Join Our Community of Innovators:</h2>
          
          <article className="space-y-8">
            <div className="">
              At Fundr, we believe in the power of community. Whether you&apos;re raising funds for a new product, an inspiring cause, or a groundbreaking idea, we are here to support you every step of the way.
            </div>
            
            <div className="">
              Our platform is designed to provide you with the best tools and resources, from campaign creation to promotion, helping you connect with a global network of supporters. Together, let&apos;s turn your vision into reality.
            </div>
          </article>
        </aside>
      </section>

      <section className="divide-y  divide-gray-800">
        {/* Telegram */}
        <div className="flex gap-x-7 py-6 px-3">
          <i className="text-xl bi bi-telegram"></i>
          
          <div className="space-y-1">
            <h3 className="">Telegram</h3>
            <article className="">Reach out to us on Telegram for quick support.</article>

            <a href="https://t.me/#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-x-1 text-sm text-gray-300 hover:text-gray-100">
              Join Telegram
              <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>

        {/* GitHub */}
        <div className="flex gap-x-7 py-6 px-3">
          <i className="text-xl bi bi-github"></i>
          
          <div className="space-y-1">
            <h3 className="">GitHub</h3>
            <article className="">Check out our open-source projects on GitHub.</article>

            <a href="https://github.com/#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-x-1 text-sm text-gray-300 hover:text-gray-100">
              Visit GitHub
              <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>

        {/* X (Twitter) */}
        <div className="flex gap-x-7 py-6 px-3">
          <i className="text-xl bi bi-linkedin"></i>
          
          <div className="space-y-1">
            <h3 className="">Linkedin</h3>
            <article className="">Follow us for updates and announcements.</article>

            <a href="https://www.linkedin.com/in/#/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-x-1 text-sm text-gray-300 hover:text-gray-100">
              Connect us on linkedin
              <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex gap-x-7 py-6 px-3">
          <i className="text-xl bi bi-telephone-fill"></i>
          
          <div className="space-y-1">
            <h3 className="">Call Us</h3>
            <article className="">You can reach us by phone for direct inquiries.</article>

            <a href="tel:+1234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-x-1 text-sm text-gray-300 hover:text-gray-100">
              +234 8012 345 6789
              <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-x-7 py-6 px-3">
          <i className="text-xl bi bi-envelope-fill"></i>
          
          <div className="space-y-1">
            <h3 className="">Email Us</h3>
            <article className="">Feel free to send us an email for any inquiries.</article>

            <a href="mailto:contact@fundr.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-x-1 text-sm text-gray-300 hover:text-gray-100">
              contact@fundr.com
              <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About