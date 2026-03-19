interface SectionHeadingProps {
  title: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cream">
        {title}
      </h2>
      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto rounded-full" />
    </div>
  );
}
