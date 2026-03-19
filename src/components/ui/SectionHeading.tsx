interface SectionHeadingProps {
  title: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? "text-white" : "text-globe-500"
        }`}
      >
        {title}
      </h2>
      <div className="w-20 h-1 bg-gold-400 mx-auto rounded-full" />
    </div>
  );
}
