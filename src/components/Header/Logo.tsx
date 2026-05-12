import Image from "next/image";

interface LogoProps {
  fallbackText?: string;
}

export function Logo({ fallbackText = "Žižkovský tunel" }: LogoProps) {
  return (
    <div className="flex items-center h-8">
      <Image
        src="/brand/logo-placeholder.svg"
        alt={fallbackText}
        width={160}
        height={40}
        className="h-8 w-auto object-contain"
        priority
        onError={() => {
          // Handled by next/image — falls back gracefully
        }}
      />
    </div>
  );
}
