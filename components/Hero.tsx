export default function Hero() {
  return (
    <div className="w-full pt-80 pb-40 h-screen text-center bg-black text-white">
      <iframe
        className="hidden xl:block w-full h-full absolute inset-0"
        src="https://www.youtube.com/embed/3SsK-cxlj_w?&autoplay=1&loop=1&mute=1&start=1958&end=2000&playlist=3SsK-cxlj_w"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="w-full h-full absolute inset-0 z-10 bg-black/10 filter backdrop-contrast-125 backdrop-brightness-75">
        <img className="xl:hidden h-full w-full object-cover" src="/images/river.jpg" alt="Pool Image" />
      </div>
      <div className="max-w-3xl xl:max-w-full mx-auto">
        <h1 className="z-40 xl:px-20 relative text-6xl xl:text-8xl leading-[1.1em] tracking-tight">
          The world is a home to many great places to discover.
        </h1>
        <p className="text-lg max-w-xl xl:max-w-4xl xl:text-2xl z-40 relative tracking-wider leading-[1.5em] font-black mx-auto mt-4 xl:mt-10 mb-10 drop-shadow-2xl filter">
          But also it's great to be prepared. During these complicated times here
          is an almanac of country statuses and restrictions. Travel with ease in
          mind.
        </p>
      </div>

      <div className="z-40 relative flex gap-8 justify-center">
        <a href="#europe" className="button">Explore Europe</a>
        <a href="#africa" className="button">Restrictions in Africa</a>
      </div>
    </div>
  )
}
