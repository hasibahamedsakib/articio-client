const SectionHeader = ({ title, text }) => {
  return (
    <div className="text-center max-w-xl pt-5 mx-auto">
      <h1 className="font-mono text-hotPink  md:w-96 mx-auto text-xl font-bold py-3">
        {text}
      </h1>

      <h1 className="text-5xl font-bold text-slate-800 mb-16">{title}</h1>
    </div>
  );
};

export default SectionHeader;
